const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('visible');
}),{threshold:.1});
document.querySelectorAll('.fade').forEach(element=>revealObserver.observe(element));

// Ambient background videos (.take-video) are decorative and autoplay by
// default; pausing them for prefers-reduced-motion matches how .fade
// already skips its motion for the same users.
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.take-video').forEach(video=>video.pause());
}
