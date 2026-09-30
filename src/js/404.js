
/**
 * Handles the 404 error page logic by importing page-specific styles and running an automatic countdown redirect to the homepage.
 * 
 * 1. `countdown` interval logic - Updates the visual timer element on the page every second and redirects the user to the base site URL when the countdown hits zero.
 */

import "../scss/pages/_404.scss";

const countdownElement = document.getElementById("countdown");
let timeLeft = 5; 

if (countdownElement) {
  const interval = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(interval);
      window.location.href = import.meta.env.BASE_URL;
    }
  }, 1000);
}
