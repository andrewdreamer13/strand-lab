

import "../scss/main.scss";
import "virtual:svg-icons-register";

import gsap from "gsap";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { optionsData } from "./data/selectOptions.js";
import { phoneMasks } from "./data/phoneMasks.js";

import { initPreloader } from "./components/preloader.js";
import { initBurger } from "./components/burger.js";
import { initChangeTheme } from "./services/changeTheme.js";
import { initModal } from "./components/modalManager.js";
 import { initLazySvg } from "./services/lazySvgLoader.js";
import { initAccordion } from "./components/accordion.js";
import { initFocusManager } from "./services/focusManager.js";
// import {initUpButton} from "./components/upButton/js";
import { initSliders } from "./components/sliders.js";
import { initTabs } from "./components/tabs.js";
import { initCookieBanner } from "./components/cookieBanner.js";
import { initCustomSelect } from "./components/customSelect.js";
import { initFormHandler } from "./forms/formHandler.js";
import { initResizableSwiper } from "./services/matchMediaSlider.js";
import {initMaps} from "./services/lazyMapLoader.js";
import { initVideoLoader } from "./services/lazyVideoLoader.js";
import { splitTextIntoSpans } from "./services/splitText.js";
import { initDatePicker } from "./components/dataPicker.js";
import { initCurrentYear } from "./helpers/currentYear.js";
import { initSyncDataAttrWithText } from "./helpers/syncDataAttrWithText.js";
import { initLongTextWatcher } from "./helpers/longTextWatcher.js";
import { initLazyImages } from "./helpers/lazyImages.js";
import { initTextareaResize } from "./helpers/textareaAutoResize.js";
import { initStickyHeader } from "./services/stickyHeader.js";


document.addEventListener("DOMContentLoaded", () => {
  console.log("The project works");
  initPreloader();
  initBurger("#burger", ".nav", ".nav__list");
  initSliders();
  initChangeTheme("#theme");
  initModal();
  initAccordion("#faq");
  initFocusManager();
  initTabs("#tabs-1");
  initCookieBanner();
  initCustomSelect("#cities", optionsData.cities);
  initCustomSelect("#countries", optionsData.countries);
  initFormHandler("#form1");
  initResizableSwiper();
  initMaps();
  initVideoLoader();
  initDatePicker();
  //  splitTextIntoSpans(".title");
    initSyncDataAttrWithText(".footer__author", "text");
    initLongTextWatcher(".main-title__word");
     initCurrentYear();
      initLazyImages();
      initTextareaResize();
      initStickyHeader();
  // initUpButton(".footer__up-button");


(async () => {
  try {
    await import("./services/svgTemplates.js");
    initLazySvg();
  } catch (error) {
    console.error("SVG template lazy-loading error:", error);
    initLazySvg();
  }
})();



});
