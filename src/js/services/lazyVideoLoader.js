
/**
 * Lazy-loads video placeholders when they enter the viewport and initializes an interactive video player upon user click.
 * 
 * 1. `initVideoLoader` - Observes designated video containers using IntersectionObserver and triggers poster setup when near the viewport.
 * 2. `setupContainer` - Injects a poster image and play button into the container, attaching a one-time click listener to mount the interactive video player.
 */

import { initCustomPlayer } from "./customVideoPlayer.js"; 

export const initVideoLoader = () => {
  const containers = document.querySelectorAll("[data-video-receiver]");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setupContainer(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "200px" },
  );

  containers.forEach((container) => observer.observe(container));
};

const setupContainer = (container) => {
  const { videoType, videoSrc, videoPoster } = container.dataset;

  container.innerHTML = `
    <img src="${videoPoster}" class="video-poster" alt="Video preview">
    <button class="play-btn" aria-label="Play video"></button>
  `;

  container.addEventListener(
    "click",
    async () => {
      await initCustomPlayer(container, { type: videoType, src: videoSrc });
      container.classList.add("_is-active");
    },
    { once: true },
  );
};
