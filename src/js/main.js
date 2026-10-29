

import "../scss/main.scss";
import "virtual:svg-icons-register";

import { initPreloader } from "./components/preloader.js";
import { initBurger } from "./components/burger.js";
import { initModal } from "./components/modalManager.js";
import { initAccordion } from "./components/accordion.js";
import { initFocusManager } from "./services/focusManager.js";
import { initSliders } from "./components/sliders.js";
import { initCookieBanner } from "./components/cookieBanner.js";
import { initFormHandler } from "./forms/formHandler.js";
import {initMaps} from "./services/lazyMapLoader.js";
import { initCurrentYear } from "./helpers/currentYear.js";
import { initSyncDataAttrWithText } from "./helpers/syncDataAttrWithText.js";
import { initLazyImages } from "./helpers/lazyImages.js";
import { initTextareaResize } from "./helpers/textareaAutoResize.js";
import { initStickyHeader } from "./services/stickyHeader.js";
import {initSymptoms} from "./components/symptoms.js";
import {initImageComparisonSlider} from "./services/ImageComparisonSlider.js";

document.addEventListener("DOMContentLoaded", () => {
  
  initPreloader();
  initBurger("#burger", ".nav");
  initSliders();
  initModal();
  initAccordion("#faq");
  initFocusManager();
  initCookieBanner();
  initFormHandler("#contacts-form");
  initMaps();
    initSyncDataAttrWithText(".nav__link", "text");
     initCurrentYear();
      initLazyImages();
      initTextareaResize();
      initStickyHeader();
      initSymptoms();
      initImageComparisonSlider(
        ".results__case-card-images",
        ".results__img-after-wrapper",
        ".results__slider-handle",
      );


});
