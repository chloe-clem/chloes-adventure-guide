import 'maplibre-gl/dist/maplibre-gl.css';

const cards=[...document.querySelectorAll('.place-card[data-place-id]')];
const sharedFilters=[...document.querySelectorAll('.shared-filter')];
const recommendationPayload=document.getElementById('destinationRecommendations');
const mapContainer=document.getElementById('cityMap');
const mapCanvas=document.getElementById('mapCanvas');
const mapSetup=document.getElementById('mapSetup');
const mapCard=document.getElementById('mapCard');
const filterStatus=document.getElementById('filterStatus');
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cardsById=new Map(cards.map(card=>[card.dataset.placeId,card]));

function readRecommendations(){
  if(!recommendationPayload?.textContent) return [];
  try{
    const recommendations=JSON.parse(recommendationPayload.textContent);
    return Array.isArray(recommendations)?recommendations:[];
  }catch{
    return [];
  }
}

function hasVerifiedCoordinates(recommendation){
  return typeof recommendation.latitude==='number'
    &&Number.isFinite(recommendation.latitude)
    &&recommendation.latitude>=-90
    &&recommendation.latitude<=90
    &&typeof recommendation.longitude==='number'
    &&Number.isFinite(recommendation.longitude)
    &&recommendation.longitude>=-180
    &&recommendation.longitude<=180;
}

function getExternalMapLinks(recommendation){
  if(!hasVerifiedCoordinates(recommendation)) return null;
  const coordinates=`${recommendation.latitude},${recommendation.longitude}`;
  return {
    google:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${recommendation.name} ${coordinates}`)}`,
    apple:`https://maps.apple.com/?ll=${encodeURIComponent(coordinates)}&q=${encodeURIComponent(recommendation.name)}`,
  };
}

function readNumber(value,fallback){
  const number=Number(value);
  return Number.isFinite(number)?number:fallback;
}

function readMapCenter(value){
  const center=value?.split(',').map(Number);
  return center?.length===2&&center.every(Number.isFinite)?center:[0,0];
}

const places=readRecommendations().map(recommendation=>({
  ...recommendation,
  card:cardsById.get(recommendation.id),
})).filter(place=>place.card);
const verifiedPlaces=places.filter(hasVerifiedCoordinates);
const markers=new Map();
let map;
let maplibregl;
let selectedPlaceId;

function updateMapCard(place){
  const image=mapCard?.querySelector('img');
  if(!mapCard||!image) return;
  image.src=place.image ? new URL(place.image,new URL('../../',document.baseURI)).href : '';
  image.alt=place.imageAlt;
  image.hidden=!place.image;
  mapCard.classList.toggle('without-image',!place.image);
  mapCard.querySelector('h3').textContent=place.name;
  mapCard.querySelector('p').textContent=place.shortDescription;
  const externalMapLinks=getExternalMapLinks(place);
  const googleLink=mapCard.querySelector('[data-map-link="google"]');
  const appleLink=mapCard.querySelector('[data-map-link="apple"]');
  if(externalMapLinks&&googleLink&&appleLink){
    googleLink.href=externalMapLinks.google;
    googleLink.setAttribute('aria-label',`Open ${place.name} in Google Maps (opens in a new tab)`);
    appleLink.href=externalMapLinks.apple;
    appleLink.setAttribute('aria-label',`Open ${place.name} in Apple Maps (opens in a new tab)`);
  }
  mapCard.classList.remove('is-cleared');
}

function clearSelection(){
  selectedPlaceId=undefined;
  cards.forEach(card=>card.classList.remove('selected'));
  markers.forEach(({element})=>element.classList.remove('selected'));
  mapCard?.classList.add('is-cleared');
}

function selectPlace(place,{moveMap=true}={}){
  selectedPlaceId=place.id;
  cards.forEach(card=>card.classList.toggle('selected',card===place.card));
  markers.forEach(({element},id)=>element.classList.toggle('selected',id===place.id));
  updateMapCard(place);
  if(moveMap&&map&&hasVerifiedCoordinates(place)){
    map.easeTo({
      center:[place.longitude,place.latitude],
      zoom:readNumber(mapContainer?.dataset.mapSelectionZoom,15.6),
      duration:prefersReducedMotion?0:700,
      padding:{bottom:110},
    });
  }
}

function applyFilter(filter){
  places.forEach(place=>{
    const visible=filter==='all'||place.interests.includes(filter);
    place.card.hidden=!visible;
    markers.get(place.id)?.element.toggleAttribute('hidden',!visible);
  });
  sharedFilters.forEach(button=>button.classList.toggle('active',button.dataset.filter===filter));
  clearSelection();
  const visiblePlaces=places.filter(place=>!place.card.hidden).length;
  const visibleMapPlaces=verifiedPlaces.filter(place=>!place.card.hidden).length;
  const activeLabel=sharedFilters.find(button=>button.dataset.filter===filter)?.textContent||filter;
  if(filterStatus) filterStatus.textContent=filter==='all'
    ? `Showing all ${visiblePlaces} recommendations and ${visibleMapPlaces} verified map location${visibleMapPlaces===1?'':'s'}.`
    : `Showing ${visiblePlaces} recommendation${visiblePlaces===1?'':'s'} and ${visibleMapPlaces} verified map location${visibleMapPlaces===1?'':'s'} for ${activeLabel}.`;
}

function showMapSetup(){
  if(!mapSetup||!mapCanvas) return;
  mapSetup.hidden=false;
  mapCanvas.hidden=true;
}

async function initializeMap(){
  if(!mapContainer||!mapCanvas) return;
  if(verifiedPlaces.length===0){
    showMapSetup();
    return;
  }
  const maplibreModule=await import('./maplibreRuntime.js');
  maplibregl=maplibreModule.default;
  map=new maplibregl.Map({
    container:mapCanvas,
    style:mapContainer.dataset.mapStyle,
    center:readMapCenter(mapContainer.dataset.mapCenter),
    zoom:readNumber(mapContainer.dataset.mapZoom,14.1),
    minZoom:readNumber(mapContainer.dataset.mapMinZoom,11),
    maxZoom:readNumber(mapContainer.dataset.mapMaxZoom,18),
    attributionControl:false,
  });
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
  map.addControl(new maplibregl.AttributionControl({compact:true}),'bottom-right');
  verifiedPlaces.forEach((place,index)=>{
    const element=document.createElement('button');
    element.type='button';
    element.className='map-pin';
    element.dataset.placeId=place.id;
    element.textContent=String(index+1);
    element.setAttribute('aria-label',`Open ${place.name}`);
    element.toggleAttribute('hidden',place.card.hidden);
    const marker=new maplibregl.Marker({element,anchor:'bottom'}).setLngLat([place.longitude,place.latitude]).addTo(map);
    const markerElement=marker.getElement();
    markers.set(place.id,{marker,element:markerElement});
  });
  new ResizeObserver(()=>map?.resize()).observe(mapContainer);
}

sharedFilters.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
mapContainer?.addEventListener('click',event=>{
  const markerElement=event.target.closest('.map-pin[data-place-id]');
  if(!markerElement) return;
  const place=places.find(candidate=>candidate.id===markerElement.dataset.placeId);
  if(place) selectPlace(place,{moveMap:false});
},{capture:true});
mapContainer?.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ') return;
  const markerElement=event.target.closest('.map-pin[data-place-id]');
  if(!markerElement) return;
  event.preventDefault();
  const place=places.find(candidate=>candidate.id===markerElement.dataset.placeId);
  if(place) selectPlace(place,{moveMap:false});
},{capture:true});
cards.forEach(card=>{
  const place=places.find(candidate=>candidate.card===card);
  const activate=()=>selectPlace(place);
  card.addEventListener('click',activate);
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}
  });
});
mapCard?.querySelector('button')?.addEventListener('click',()=>{
  const place=places.find(candidate=>candidate.id===selectedPlaceId);
  place?.card.scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'center'});
  place?.card.focus({preventScroll:true});
});

if(mapContainer){
  const mapObserver=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      mapObserver.disconnect();
      initializeMap();
    }
  },{rootMargin:'300px'});
  mapObserver.observe(mapContainer);
}
applyFilter('all');

const modal=document.getElementById('storyModal');
document.querySelectorAll('#storyGallery button').forEach(button=>button.addEventListener('click',()=>{
  modal.querySelector('img').src=button.dataset.img;
  modal.querySelector('h2').textContent=button.dataset.title;
  modal.querySelector('p').textContent=button.dataset.story;
  modal.hidden=false;
  document.body.style.overflow='hidden';
}));
modal?.querySelector('.modal-close')?.addEventListener('click',()=>{
  modal.hidden=true;
  document.body.style.overflow='';
});
modal?.addEventListener('click',event=>{
  if(event.target===modal){
    modal.hidden=true;
    document.body.style.overflow='';
  }
});
