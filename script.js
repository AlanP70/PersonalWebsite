document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

// Custom aperture cursor — fine pointers only, mirrors the photography motif
if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const ring = document.querySelector(".cursor-ring");
  const dot = document.querySelector(".cursor-dot");

  if (ring && dot) {
    let targetX = 0, targetY = 0, ringX = 0, ringY = 0;
    document.body.classList.add("has-custom-cursor");

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    });

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    const activeSelector = "a, button, .card, .filmstrip li";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(activeSelector)) {
        document.body.classList.add("cursor-active");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(activeSelector)) {
        document.body.classList.remove("cursor-active");
      }
    });
  }
}
