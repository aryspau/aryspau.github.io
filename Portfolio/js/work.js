const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.site-nav');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.addEventListener('click', (event) => {
  if (!menuToggle || !navLinks) return;
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

const reveals = document.querySelectorAll('.reveal');
function revealElements() {
  const wh = window.innerHeight;
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < wh - 120) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealElements);
revealElements();

const heroBg = document.querySelector('.work-hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.08)`;
});

const heroContent = document.querySelector('.work-hero-content');
window.addEventListener('scroll', () => {
  if (heroContent) heroContent.style.opacity = Math.max(0, 1 - window.scrollY / 420);
});

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const rx = (e.clientY - r.top - r.height / 2) / 25;
    const ry = (r.width / 2 - (e.clientX - r.left)) / 25;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
