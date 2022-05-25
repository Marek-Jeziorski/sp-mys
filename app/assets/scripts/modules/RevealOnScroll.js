import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
  constructor(elements, tresholdPercent) {
    this.itemsToReveal = elements;
    this.tresholdPercent = tresholdPercent;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle);
    window.addEventListener(
      'resize',
      debounce(() => {
        console.log('Resize just run');
        this.browserHeight = window.innerHeight;
      }, 333)
    );
  }

  calcCaller() {
    console.log('Scroll function run');
    this.itemsToReveal.forEach((el) => this.calculateIfScrolledTo(el));
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + window.innerHeight > el.offsetTop) {
      console.log('Element was calculated');
      let scrollPercent =
        (el.getBoundingClientRect().y / window.innerHeight) * 100;

      if (scrollPercent < this.tresholdPercent) {
        console.log(this.tresholdPercent);
        el.classList.add('reveal-item--is-visible');
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener('scroll', this.scrollThrottle);
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add('reveal-item');
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;
