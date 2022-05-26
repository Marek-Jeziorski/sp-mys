import throttle from 'lodash/throttle';

class StickyHeader {
  constructor() {
    this.header = document.querySelector('.header');
    this.events();
  }

  events() {
    window.addEventListener(
      'scroll',
      throttle(() => this.runOnScroll(), 200)
    );
  }

  runOnScroll() {
    if (window.scrollY > 60) {
      this.header.classList.add('header--dark');
    } else {
      this.header.classList.remove('header--dark');
    }
  }
}

export default StickyHeader;
