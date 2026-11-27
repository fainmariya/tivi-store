export function createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('site-header');
    const logo = document.createElement('a');
    logo.classList.add('site-header__logo');
    logo.href = '/index.html';
    logo.textContent = 'TIVI';
    const nav = document.createElement("nav");
    nav.classList.add("site-header__nav");
    nav.setAttribute("aria-label", "Main navigation");
    
    const navigationItems = [
        { label: 'Home', href: '/index.html' },
        { label: 'Catalog', href: '/catalog.html' },
        { label: 'About Us', href: '/index.html' },
      ];
      
      navigationItems.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
      
        nav.append(link);
      });
      
      const cartLink = document.createElement('a');
cartLink.classList.add('site-header__cart');
cartLink.href = './cart.html';
cartLink.setAttribute('aria-label', 'Shopping cart');

cartLink.innerHTML = `
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 7h12l1 13H5L6 7Z" />
    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
  </svg>
`;
header.append(logo, nav, cartLink);
    return header;
  }