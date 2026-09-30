
/**
 * Manages the display timing, user interactions, and local storage persistence for the cookie consent banner.
 * 
 * 1. `initCookieBanner` - Checks `localStorage` for saved consent preferences, displays the banner after a 1.5-second delay if no choice is recorded, and persists the user's decision ('accepted' or 'declined') upon interaction.
 */

export const initCookieBanner = () => {
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const declineBtn = document.getElementById("cookieDecline");

  if (!banner || !acceptBtn || !declineBtn) return;

  const STORAGE_KEY = "cookie-consent";
  const hasConsented = localStorage.getItem(STORAGE_KEY);

  if (!hasConsented) {
    setTimeout(() => {
      banner.classList.add("cookie-banner--show");
    }, 1500);
  }

  const handleChoice = (choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch (e) {
      console.warn(e);
    }
    banner.classList.remove("cookie-banner--show");
  };

  acceptBtn.addEventListener("click", () => handleChoice("accepted"));
  declineBtn.addEventListener("click", () => handleChoice("declined"));
};
