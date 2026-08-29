const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const closeMenu = ({ returnFocus = false } = {}) => {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
  if (returnFocus) menuButton.focus();
};

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
    closeMenu({ returnFocus: true });
  }
});

document.addEventListener('click', (event) => {
  if (!navLinks?.classList.contains('open')) return;
  if (navLinks.contains(event.target) || menuButton?.contains(event.target)) return;
  closeMenu();
});

const desktopQuery = window.matchMedia('(min-width: 761px)');
const handleDesktopChange = (event) => {
  if (event.matches) closeMenu();
};
desktopQuery.addEventListener?.('change', handleDesktopChange);

// Keep the active section reflected in the navigation as visitors scroll.
const sectionLinks = new Map(
  [...document.querySelectorAll('.nav-links a[href^="#"]')].map((link) => [
    link.getAttribute('href').slice(1),
    link,
  ])
);

if ('IntersectionObserver' in window && sectionLinks.size) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      sectionLinks.forEach((link, id) => {
        if (id === visible.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-20% 0px -65%', threshold: [0, 0.25, 0.5] }
  );

  sectionLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();