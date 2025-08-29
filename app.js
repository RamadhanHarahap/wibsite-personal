// Initialize AOS
AOS && AOS.init({ duration: 800, once: true });

// Simple contact form handler (demo)
function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('cname').value.trim();
  const result = document.getElementById('contactResult');
  result.style.display = 'block';
  result.innerHTML = `<div class="alert alert-success">Terima kasih, ${name || 'pengunjung'}! Pesanmu sudah tercatat (demo).</div>`;
  document.getElementById('contactForm').reset();
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return false;
}

// Smooth active link on scroll (update active nav item)
(function(){
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function onScroll(){
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec=>{
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.id;
      if(scrollPos >= top && scrollPos < bottom){
        navLinks.forEach(a=>a.classList.remove('active'));
        const target = document.querySelector('.nav-link[href="#' + id + '"]');
        if(target) target.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
})();

// Lazy load images (simple)
(function(){
  const lazyImgs = [].slice.call(document.querySelectorAll('img.lazy'));
  if('IntersectionObserver' in window){
    let io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = ()=> img.classList.add('loaded');
          obs.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => io.observe(img));
  } else {
    // fallback
    lazyImgs.forEach(img => { img.src = img.dataset.src; img.classList.add('loaded'); });
  }
})();

// Keyboard accessible project cards: open first modal bound to button inside
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    const active = document.activeElement;
    if(active && active.classList.contains('project-card')){
      const btn = active.querySelector('.view-project');
      if(btn) btn.click();
    }
  }
});
