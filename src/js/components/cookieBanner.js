


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
