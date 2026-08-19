/* ============================================
   Northwest Piano & Voice — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile nav ---
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');

  function closeNav() {
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    if (nav) nav.classList.add('open');
    if (toggle) toggle.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('nav-open');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close nav on same-page anchor clicks only
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- Video placeholder ---
  document.querySelectorAll('.video-placeholder').forEach(el => {
    el.addEventListener('click', () => {
      const videoId = el.dataset.videoId;
      if (!videoId) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
      el.innerHTML = '';
      el.style.cursor = 'default';
      el.appendChild(iframe);
    });
  });

  // --- Active nav link ---
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
