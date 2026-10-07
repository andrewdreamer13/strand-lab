

import Swiper from "swiper/bundle";

export const createResizableSwiper = (
  breakpointString,
  selector,
  settings,
  callback,
) => {
  const mediaQuery = window.matchMedia(breakpointString);
  let swiperInstance;

  const checker = () => {
    const elementExists = document.querySelector(selector);

    if (mediaQuery.matches) {
      if (swiperInstance === undefined && elementExists) {
        swiperInstance = new Swiper(selector, settings);
        if (callback) callback(swiperInstance);
      }
    } else {
      if (swiperInstance !== undefined) {
        swiperInstance.destroy(true, true);
        swiperInstance = undefined;
      }
    }
  };

  mediaQuery.addEventListener("change", checker);
  checker();
};

