class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector('.header__nav-icon');
    this.menuContent = document.querySelector('.header__navbar');
    this.events();
  }

  events() {
    this.menuIcon.addEventListener('click', () => this.toggleTheMenu());
  }

  toggleTheMenu() {
    this.menuContent.classList.toggle('header__navbar--is-visible');
  }
}

export default MobileMenu;
