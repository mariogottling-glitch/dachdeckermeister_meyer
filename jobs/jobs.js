const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#career-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu?.classList.toggle('open', !isOpen);
});

const progressLine = document.querySelector('.roof-progress');
const careerPath = document.querySelector('.career-path');

if (progressLine && careerPath && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pathLength = progressLine.getTotalLength();
  progressLine.style.strokeDasharray = String(pathLength);
  progressLine.style.strokeDashoffset = String(pathLength);

  const updatePath = () => {
    const rect = careerPath.getBoundingClientRect();
    const start = innerHeight * .82;
    const distance = rect.height + innerHeight * .35;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
    progressLine.style.strokeDashoffset = String(pathLength * (1 - progress));
  };

  addEventListener('scroll', updatePath, { passive: true });
  addEventListener('resize', updatePath);
  updatePath();
}

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .12 })
  : null;

document.querySelectorAll('.benefit-grid article, .entry-cards article, .process-list li').forEach((element) => {
  element.classList.add('reveal');
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in');
});
