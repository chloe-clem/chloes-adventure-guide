const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

(() => {
  if(!document.body.classList.contains('home')) return;
  const params=new URLSearchParams(location.search);
  const requested=params.get('return');
  const id=requested==='feel'?'feel':requested==='atlas'?'atlas-list':location.hash.slice(1);
  if(!['feel','atlas-list'].includes(id)) return;
  const restore=()=>{ const target=document.getElementById(id); if(target) window.scrollTo({top:target.offsetTop,behavior:'auto'}); };
  restore(); requestAnimationFrame(restore);
  addEventListener('load',()=>{ restore(); if(requested) history.replaceState(null,'',`${location.pathname}#${id}`); },{once:true});
})();

(() => {
  if(!document.body.classList.contains('home')) return;
  const openEarth=(event)=>{
    event?.preventDefault();
    document.documentElement.classList.remove('skip-home-intro');
    history.replaceState(null,'',`${location.pathname}#top`);
    requestAnimationFrame(()=>{ window.scrollTo({top:0,behavior:'auto'}); requestAnimationFrame(()=>window.dispatchEvent(new Event('scroll'))); });
  };
  document.querySelectorAll('.earth-home-link').forEach(link=>link.addEventListener('click',openEarth));
})();

(() => {
  if(!document.body.classList.contains('home')) return;
  const hero=document.querySelector('.earth-hero'),story=document.querySelector('.earth-story'),nav=document.querySelector('.nav');
  if(!hero||!story) return;
  const clamp=v=>Math.max(0,Math.min(1,v));
  const smoothstep=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x)};
  const updateStory=()=>{
    const rect=story.getBoundingClientRect(),max=Math.max(1,story.offsetHeight-innerHeight),p=clamp(-rect.top/max);
    const title=1-smoothstep(.08,.34,p);
    const earth=1-smoothstep(.25,.55,p);
    const reveal=smoothstep(.48,.66,p);
    const revealY=(1-reveal)*28;
    const blur=smoothstep(.30,.58,p)*5;
    hero.style.setProperty('--story',p.toFixed(3));
    hero.style.setProperty('--title-opacity',title.toFixed(3));
    hero.style.setProperty('--earth-opacity',earth.toFixed(3));
    hero.style.setProperty('--reveal-opacity',reveal.toFixed(3));
    hero.style.setProperty('--reveal-y',revealY.toFixed(1)+'px');
    hero.style.setProperty('--earth-blur',blur.toFixed(2)+'px');
    nav&&nav.classList.toggle('scrolled',scrollY>80);
  };
  addEventListener('scroll',updateStory,{passive:true});
  addEventListener('resize',updateStory);
  updateStory();
})();
