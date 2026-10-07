import { createResizableSwiper } from "../services/matchMediaSlider.js"; // твой хелпер слайдера

// 1. Логика для Hover на Desktop
const initSymptomsDesktopHover = () => {
  if (!window.matchMedia("(hover: hover)").matches) return;

  const cards = document.querySelectorAll(".symptoms__card");

  cards.forEach((card) => {
    const video = card.querySelector(".symptoms__card-video");
    if (!video) return;

    card.addEventListener("mouseenter", () => {
      if (window.innerWidth <= 1024) return;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    });

    card.addEventListener("mouseleave", () => {
      if (window.innerWidth <= 1024) return;

      video.pause();
      // video.currentTime = 0;
    });
  });
};

// 2. Логика для Swiper на Mobile/Tablet
const updateSwiperVideos = (swiper) => {
  swiper.slides.forEach((slide, index) => {
    const video = slide.querySelector(".symptoms__card-video");
    if (!video) return;

    if (index === swiper.activeIndex) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      // video.currentTime = 0;
    }
  });
};

function updateRangeFraction(swiper, currentEl, totalEl) {
  if (!currentEl || !totalEl) return;

  const realCards = swiper.el.querySelectorAll(
    ".symptoms__card:not(.swiper-slide-duplicate)",
  );

  currentEl.textContent = swiper.realIndex + 1;
  totalEl.textContent = realCards.length;
}

const initSymptomsSwiper = () => {
  const currentEl = document.querySelector(".symptoms__pagination-current");
  const totalEl = document.querySelector(".symptoms__pagination-total");

  createResizableSwiper("(max-width: 1024px)", ".symptoms__cards", {
    speed: 800,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 12,
    loop: true,
    breakpoints: {
      560: {
        slidesPerView: 2,
        spaceBetween: 14,
      },
      820: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
    navigation: {
      nextEl: ".symptoms__button-next",
      prevEl: ".symptoms__button-prev",
    },
    on: {
      init(swiper) {
        updateSwiperVideos(swiper);
        updateRangeFraction(swiper, currentEl, totalEl);
      },
      slideChange(swiper) {
        updateSwiperVideos(swiper);
        updateRangeFraction(swiper, currentEl, totalEl);
      },
      resize(swiper) {
        updateRangeFraction(swiper, currentEl, totalEl);
      },
    },
  });
};

// 3. Единая точка входа для всей секции Symptoms
export const initSymptoms = () => {
  const symptomsSection = document.querySelector(".symptoms");
  if (!symptomsSection) return; 

  initSymptomsDesktopHover();
  initSymptomsSwiper();
};
