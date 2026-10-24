


 import "../scss/pages/_404.scss";

const countdownElement = document.getElementById("countdown");
let timeLeft = 10; 

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
