import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

export const initSliders = () => {
  initAssessmentSlider();
  initResultsSlider();
};

const initAssessmentSlider = () => {
  const steps = document.querySelectorAll(".assessment__step");
  const swiper = new Swiper(".assessment__slider", {
    speed: 1200,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init() {
        steps[0]?.classList.add("assessment__step--active");
      },
      slideChange() {
        steps.forEach((step, index) => {
          step.classList.toggle(
            "assessment__step--active",
            index === this.activeIndex,
          );
        });
      },
    },
  });
};

function updateRangeFraction(swiper, currentEl, totalEl) {
  if (!currentEl || !totalEl) return;

  currentEl.textContent = swiper.activeIndex + 1;
  totalEl.textContent = swiper.slides.length;
}

const initResultsSlider = () => {
  const isDesktop = window.innerWidth >= 576;
  const currentEl = document.querySelector(".results__pagination-current");
  const totalEl = document.querySelector(".results__pagination-total");
  const swiper = new Swiper(".results__slider", {
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 20,
    effect: "fade",
    effect: isDesktop ? "fade" : "slide",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".results__button-next",
      prevEl: ".results__button-prev",
    },
    on: {
      init(swiper) {
        updateRangeFraction(swiper, currentEl, totalEl);
      },
      slideChange(swiper) {
        updateRangeFraction(swiper, currentEl, totalEl);
      },
      resize(swiper) {
        updateRangeFraction(swiper, currentEl, totalEl);
      },
    },
  });
};
