
/**
 * Attaches a click event listener to a target scroll-to-top button, triggering smooth window scrolling to the top of the page.
 * 
 * 1. `initUpButton` - Queries the scroll button using the provided selector and binds a click handler to smoothly scroll the window to `top: 0`.
 */

export const initUpButton = (buttonSelector) => {
  const button = document.querySelector(buttonSelector);
  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
