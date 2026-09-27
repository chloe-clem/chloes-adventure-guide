// Point the destination page's back link at wherever the visitor came from:
// the category they were browsing, or the full destination list.
(function(){
  const back=document.getElementById('destinationBack');
  if(!back)return;
  const params=new URLSearchParams(location.search);
  const from=params.get('from');
  const category=params.get('category');
  const base=back.dataset.base || '/';
  if(from==='category' && category){
    const title=category.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
    back.href=`${base}explore/${encodeURIComponent(category)}/`;
    back.textContent=`← Back to ${title}`;
  }else if(from==='atlas'){
    back.href=`${base}#atlas-list`;
    back.textContent='← All destinations';
  }else if(document.referrer){
    try{
      const ref=new URL(document.referrer);
      if(ref.origin===location.origin && ref.pathname.includes('/explore/')){
        back.href=ref.href;
        back.textContent='← Back to category';
      }
    }catch(e){}
  }
})();
