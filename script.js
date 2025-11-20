document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const pager = document.querySelector('.pager');

  let visible = window.innerWidth <= 640 ? 1 : 3; 
  let currentIndex = 0;
  let slideWidth = 0;

  function setup() {
    visible = window.innerWidth <= 640 ? 1 : 3;
    slideWidth = slides[0].getBoundingClientRect().width;
    if (currentIndex > slides.length - visible) currentIndex = 0;
    update();
    setupPager();
  }

  function update() {
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
    updatePagerActive();
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex > slides.length - visible) {
      currentIndex = 0; 
    }
    update();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = Math.max(0, slides.length - visible); 
    }
    update();
  }

  function setupPager() {
    const pages = Math.ceil(slides.length / visible);
    pager.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.addEventListener('click', () => {
        currentIndex = i * visible;
        if (currentIndex > slides.length - visible) currentIndex = Math.max(0, slides.length - visible);
        update();
      });
      pager.appendChild(dot);
    }
    updatePagerActive();
  }

  function updatePagerActive() {
    const dots = Array.from(pager.children);
    if (dots.length === 0) return;
    const activePage = Math.floor(currentIndex / visible);
    dots.forEach((d, i) => d.classList.toggle('active', i === activePage));
  }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 120);
  });

  const imgs = Array.from(document.querySelectorAll('.slide img'));
  let imagesLoaded = 0;
  imgs.forEach(img => {
    if (img.complete) imagesLoaded++;
    else img.addEventListener('load', () => {
      imagesLoaded++;
      if (imagesLoaded === imgs.length) setup();
    });
  });
  if (imagesLoaded === imgs.length) setup();
});
