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

function loadProjects() {
  const tpl = document.getElementById('projectsData');
  return Array.from(tpl.content.querySelectorAll('article')).map((a) => ({
    nombre: a.dataset.nombre,
    descripcion: a.dataset.desc,
    tecnologias: a.dataset.tecnologias.split(',').map((s) => s.trim()).filter(Boolean),
    imagenes: a.dataset.imagenes.split(',').map((s) => s.trim()).filter(Boolean),
  }));
}

const projects = loadProjects();
let active = 0;
let imgIdx = 0;

const cfEl = document.getElementById('coverflow');
const nameEl = document.getElementById('projName');
const descEl = document.getElementById('projDesc');
const tagsEl = document.getElementById('projTags');
const galleryImg = document.getElementById('galleryImg');
const thumbsEl = document.getElementById('thumbs');

function buildCovers() {
  cfEl.innerHTML = '';
  projects.forEach((p, i) => {
    const offset = i - active;
    const abs = Math.abs(offset);
    if (abs > 2) return;
    const btn = document.createElement('button');
    btn.className = 'cover' + (i === active ? ' active' : '');
    btn.type = 'button';
    btn.style.transform = `translateX(${offset * -20}px) rotateY(${offset * -25}deg) scale(${1 - abs * 0.15})`;
    btn.style.opacity = String(1 - abs * 0.35);
    btn.style.zIndex = String(10 - abs);
    btn.addEventListener('click', () => {
      active = i;
      imgIdx = 0;
      renderAll();
    });
    const im = document.createElement('img');
    im.src = p.imagenes[0];
    im.alt = p.nombre;
    btn.appendChild(im);
    cfEl.appendChild(btn);
  });
}

function renderInfo() {
  const p = projects[active];
  nameEl.textContent = p.nombre;
  descEl.textContent = p.descripcion;
  tagsEl.innerHTML = '';
  p.tecnologias.forEach((t) => {
    const s = document.createElement('span');
    s.className = 'tag';
    s.textContent = t;
    tagsEl.appendChild(s);
  });
}

function renderGallery() {
  const p = projects[active];
  galleryImg.src = p.imagenes[imgIdx];
  galleryImg.alt = `${p.nombre} - ${imgIdx + 1}`;
  galleryImg.style.animation = 'none';
  void galleryImg.offsetWidth;
  galleryImg.style.animation = '';
  thumbsEl.innerHTML = '';
  p.imagenes.forEach((src, i) => {
    const b = document.createElement('button');
    b.className = 'thumb-btn' + (i === imgIdx ? ' active' : '');
    b.type = 'button';
    b.addEventListener('click', () => {
      imgIdx = i;
      renderGallery();
    });
    const im = document.createElement('img');
    im.src = src;
    im.alt = `${p.nombre} miniatura ${i + 1}`;
    b.appendChild(im);
    thumbsEl.appendChild(b);
  });
}

function renderAll() {
  buildCovers();
  renderInfo();
  renderGallery();
}

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  renderAll();
});
