/* ===== MAIN (compartido) =====
   - Año en footer
   - Toggle menú móvil
   - Reveal on scroll
*/

document.addEventListener('DOMContentLoaded', () => {
  // Año
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }
});
