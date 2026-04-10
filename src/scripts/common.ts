window.addEventListener('load', () => {
  const menuBtn = document.querySelector('.btn-menu');
  const navList = document.querySelector('#nav-list');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('on');
      navList.classList.toggle('on');
      
      const isExpanded = menuBtn.classList.contains('on');
      menuBtn.setAttribute('aria-expanded', isExpanded.toString());
    });
  } 
});