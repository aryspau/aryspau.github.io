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

function loadDesigns() {
  const tpl = document.getElementById('designsData');
  const articles = tpl.content.querySelectorAll('article');
  return Array.from(articles).map((a) => ({
    nombre: a.dataset.nombre,
    descripcion: a.dataset.desc,
    imagenes: a.dataset.imagenes.split(',').map((s) => s.trim()).filter(Boolean),
  }));
}

const designs = loadDesigns();
let slide = 0;
let img = 0;

const titleEl = document.getElementById('designTitle');
const descEl = document.getElementById('designDesc');
const imgEl = document.getElementById('designImage');
const dotsEl = document.getElementById('dots');
const stage = document.getElementById('stage');

function render() {
  const d = designs[slide];
  titleEl.textContent = d.nombre;
  descEl.textContent = d.descripcion;
  imgEl.src = d.imagenes[img];
  imgEl.alt = `${d.nombre} - ${img + 1}`;
  stage.classList.remove('fade-in');
  void stage.offsetWidth;
  stage.classList.add('fade-in');
  dotsEl.innerHTML = '';
  d.imagenes.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === img ? ' active' : '');
    b.setAttribute('aria-label', `Imagen ${i + 1}`);
    b.addEventListener('click', () => {
      img = i;
      render();
    });
    dotsEl.appendChild(b);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prevSlide').addEventListener('click', () => {
    slide = (slide - 1 + designs.length) % designs.length;
    img = 0;
    render();
  });
  document.getElementById('nextSlide').addEventListener('click', () => {
    slide = (slide + 1) % designs.length;
    img = 0;
    render();
  });
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  render();
});
