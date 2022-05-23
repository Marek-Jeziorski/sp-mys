class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll('.programs__img');
    this.hideInitially();
    this.events();
  }

  events() {
    window.addEventListener('scroll', () => {
      console.log('Scroll function run');
      this.itemsToReveal.forEach((el) => this.calculateIfScrolledTo(el));
    });
  }

  hideInitially() {
    this.itemsToReveal.forEach((el) => el.classList.add('reveal-item'));
  }

  calculateIfScrolledTo(el) {
    console.log(el.getBoundingClientRect().y);
  }
}

export default RevealOnScroll;
