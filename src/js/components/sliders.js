import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const initSliders = () => {
  initAssessmentSlider();
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
