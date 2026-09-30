
/**
 * Initializes Swiper slider instances with bundled CSS styles and custom control configurations (pagination, navigation buttons, and scrollbars).
 * 
 * 1. `initSliders` - Serves as the entry point wrapper to trigger slider setup routines across the application.
 * 2. `initMainSlider` - Instantiates a centered, looping Swiper carousel for `.main-slider` containers with interactive navigation, pagination, and scrollbar controls.
 */

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const initSliders = () => {
  initMainSlider();
};

const initMainSlider = () => {
  const swiper = new Swiper(".main-slider", {
    loop: true,
    speed: 500,
    centeredSlides: true,
    slidesPerView: 2,
    spaceBetween: 20,

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
};
