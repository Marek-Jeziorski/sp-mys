import "../styles/styles.css";
import "lazysizes";

import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".programs__img"), 75);
/* new RevealOnScroll(document.querySelectorAll('.footer__col'), 66); */
new MobileMenu();

/* ---MODAL--- */
let modal;
document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "overlay - modal" */ "./modules/Modal")
        .then((x) => {
          modal = new x.default();
          setTimeout(() => modal.openTheModal(), 20);
        })
        .catch(() => console.log("There was a problem."));
    } else {
      modal.openTheModal();
    }
  });
});

/* ---------------------------------------------------------------------------- */
if (module.hot) {
  module.hot.accept();
}
