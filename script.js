const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const closeMenu = () => {
  navLinks?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
};

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    menuButton?.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!navLinks?.classList.contains('open')) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!navLinks.contains(target) && !menuButton?.contains(target)) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();