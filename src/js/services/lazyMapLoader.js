

// import { initIframeMap } from "../components/iframeMap";
import { initCustomMap } from "../components/customMap";

export const initMaps = () => {
  const mapContainers = document.querySelectorAll("[data-map-receiver]");
  if (mapContainers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const type = container.dataset.mapType;

          if (type === "iframe") {
            initIframeMap(container);
          } else if (type === "custom") {
            await initCustomMap(container);
          }

          observer.unobserve(container);
        }
      });
    },
    { rootMargin: "200px" },
  );

  mapContainers.forEach((container) => observer.observe(container));
};