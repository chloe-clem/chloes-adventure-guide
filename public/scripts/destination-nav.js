(function(){
  const back=document.getElementById('destinationBack');
  if(!back)return;
  const params=new URLSearchParams(location.search);
  const from=params.get('from');
  const feeling=params.get('feeling');
  const base=back.dataset.base || '/';
  if(from==='collection' && feeling){
    back.href=`${base}feelings/${encodeURIComponent(feeling)}/`;
    back.textContent='← Back to collection';
  }else if(from==='atlas'){
    back.href=`${base}#atlas-list`;
    back.textContent='← Back to complete atlas';
  }else if(document.referrer){
    try{
      const ref=new URL(document.referrer);
      if(ref.origin===location.origin && ref.pathname.includes('/feelings/')){
        back.href=ref.href;
        back.textContent='← Back to collection';
      }
    }catch(e){}
  }
})();


// Keep the destination back control out of the way; reveal it briefly when scrolling upward.
(function(){
  const back=document.getElementById('destinationBack');
  if(!back)return;
  let lastY=window.scrollY;
  let hideTimer;
  const showBriefly=()=>{
    back.classList.add('is-visible');
    clearTimeout(hideTimer);
    hideTimer=setTimeout(()=>back.classList.remove('is-visible'),1600);
  };
  if(window.scrollY<120) showBriefly();
  addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(y<100 || y<lastY-8) showBriefly();
    else if(y>lastY+8) back.classList.remove('is-visible');
    lastY=y;
  },{passive:true});
  back.addEventListener('focus',()=>back.classList.add('is-visible'));
  back.addEventListener('blur',()=>{hideTimer=setTimeout(()=>back.classList.remove('is-visible'),500)});
})();
