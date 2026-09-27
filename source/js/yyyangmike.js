document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===============================
     Hero ready
     =============================== */

  requestAnimationFrame(() => {
    document.body.classList.add('yy-ready');
  });


  /* ===============================
     Navigation scroll state
     =============================== */

  const updateNavState = () => {
    if (window.scrollY > 48) {
      document.body.classList.add('yy-scrolled');
    } else {
      document.body.classList.remove('yy-scrolled');
    }
  };

  updateNavState();

  window.addEventListener(
    'scroll',
    updateNavState,
    { passive: true }
  );


  /* ===============================
     Reduced motion
     =============================== */

  if (reduceMotion) return;


  /* ===============================
     Scroll reveal
     =============================== */

  const revealTargets = document.querySelectorAll(
    [
      '.yy-philosophy p',
      '.yy-manifesto p',
      '.yy-explore h2',
      '.yy-world-card',
      '.yy-recent h2',
      '.yy-empty-state'
    ].join(',')
  );


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add('yy-visible');

        observer.unobserve(entry.target);
      });
    },

    {
      threshold: 0.20,
      rootMargin: '0px 0px -7% 0px'
    }
  );


  revealTargets.forEach((element) => {
    observer.observe(element);
  });


  /* ===============================
     Manifesto stagger
     =============================== */

  const manifestoLines =
    document.querySelectorAll('.yy-manifesto p');

  manifestoLines.forEach((line, index) => {
    line.style.transitionDelay =
      `${index * 130}ms`;
  });


  /* ===============================
     Explore cards stagger
     =============================== */

  const cards =
    document.querySelectorAll('.yy-world-card');

  cards.forEach((card, index) => {
    card.style.transitionDelay =
      `${index * 90}ms`;
  });
});