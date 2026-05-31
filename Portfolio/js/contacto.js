/* ===== CONTACTO ===== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== Animación en cascada ===== */
  const cards = document.querySelectorAll(".contact-card");

  cards.forEach((card, i) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(() => {

      card.style.transition =
        "opacity .7s ease, transform .7s ease";

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

    }, i * 180);

  });

  /* ===== Reveal al hacer scroll ===== */
  const revealElements = document.querySelectorAll(
    ".contact-card, .contact-photo, .quote"
  );

  function revealOnScroll() {

    const trigger =
      window.innerHeight - 100;

    revealElements.forEach(el => {

      const top =
        el.getBoundingClientRect().top;

      if (top < trigger) {
        el.classList.add("visible");
      }

    });

  }

  revealOnScroll();

  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  /* ===== Tilt 3D tarjetas ===== */
  cards.forEach(card => {

    card.addEventListener("mousemove", e => {

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 12;

      const rotateX =
        ((y / rect.height) - 0.5) * -12;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
      `;

    });

  });

  /* ===== Foto flotante ===== */
  const photo =
    document.querySelector(".contact-photo");

  if (photo) {

    let start = null;

    function floatPhoto(timestamp) {

      if (!start) start = timestamp;

      const progress =
        (timestamp - start) / 1000;

      photo.style.transform =
        `translateY(${Math.sin(progress * 2) * 8}px)`;

      requestAnimationFrame(floatPhoto);

    }

    requestAnimationFrame(floatPhoto);

  }

  /* ===== Año automático ===== */
  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});