export const initLazyImages = () => {
  const imagesMap = import.meta.glob("/src/assets/img/webp/*.webp", {
    eager: true,
    import: "default",
  });

  const lazyImages = document.querySelectorAll("[data-src]");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const image = entry.target;
        const dataSrc = image.dataset.src;

        if (dataSrc) {
          const fileName = dataSrc.split("/").pop();

          const realUrl = Object.entries(imagesMap).find(([path]) =>
            path.endsWith(fileName),
          )?.[1];

          image.src = realUrl || dataSrc;
          image.removeAttribute("data-src");
        }

        observer.unobserve(image);
      });
    },
    {
      rootMargin: "100px 0px",
    },
  );

  lazyImages.forEach((image) => imageObserver.observe(image));
};
