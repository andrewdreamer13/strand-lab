export const initStickyHeader = () => {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const threshold = 700;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 0) {
      ticking = false;
      return;
    }

    const isScrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY <= threshold) {
      if (header.classList.contains("header--scrolled")) {
        header.classList.remove("header--scrolled");
      }

      if (currentScrollY === 0) {
        header.classList.remove("header--hidden");
      } else {
        if (!header.classList.contains("header--hidden")) {
          header.classList.add("header--hidden");
        }
      }
    } else {
      if (!header.classList.contains("header--scrolled")) {
        header.classList.add("header--scrolled");
      }

      if (isScrollingDown) {
        if (!header.classList.contains("header--hidden")) {
          header.classList.add("header--hidden");
        }
      } else {
        if (header.classList.contains("header--hidden")) {
          header.classList.remove("header--hidden");
        }
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
};
