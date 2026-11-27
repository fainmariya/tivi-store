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
      header.append(logo, nav);
    return header;
  }