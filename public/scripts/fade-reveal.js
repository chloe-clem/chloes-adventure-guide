const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('visible');
}),{threshold:.1});
document.querySelectorAll('.fade').forEach(element=>revealObserver.observe(element));
