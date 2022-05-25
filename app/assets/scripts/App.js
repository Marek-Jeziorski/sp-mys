import '../styles/styles.css';

import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll('.programs__img'), 75);
new RevealOnScroll(document.querySelectorAll('.footer__col'), 66);

/* ---------------------------------------------------------------------------- */
if (module.hot) {
  module.hot.accept();
}
