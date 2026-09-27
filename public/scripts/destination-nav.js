// Point the destination page's back link at wherever the visitor came from:
// the feeling collection they were browsing, or the full destination list.
(function(){
  const back=document.getElementById('destinationBack');
  if(!back)return;
  const params=new URLSearchParams(location.search);
  const from=params.get('from');
  const feeling=params.get('feeling');
  const base=back.dataset.base || '/';
  if(from==='collection' && feeling){
    back.href=`${base}feelings/${encodeURIComponent(feeling)}/`;
    back.textContent=`← Back to ${feeling.charAt(0).toUpperCase()}${feeling.slice(1)}`;
  }else if(from==='atlas'){
    back.href=`${base}#atlas-list`;
    back.textContent='← All destinations';
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
