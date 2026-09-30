
/**
 * Manages the page preloader lifecycle, hiding and removing the element from the DOM once all window assets have fully loaded.
 * 
 * 1. `initPreloader` - Attaches a one-time `load` event listener to the window to apply a hiding class to `#preloader` and remove it from the DOM after a timed delay.
 */

export const initPreloader = () => {
  const preloader = document.querySelector("#preloader");
  if (!preloader) return;

  window.addEventListener(
    "load",
    () => {
      preloader.classList.add("hide");

      setTimeout(() => {
        preloader.remove();
      }, 600);
    },
    { once: true },
  );
};
