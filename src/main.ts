import './main.scss';

const menuBtn = document.querySelector('#btn-menu') as HTMLButtonElement | null;
const navList = document.querySelector('#nav-list') as HTMLElement | null;

if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('on');
    navList.classList.toggle('on');
    
    const isExpanded = menuBtn.classList.contains('on');
    menuBtn.setAttribute('aria-expanded', isExpanded.toString());
  });
}