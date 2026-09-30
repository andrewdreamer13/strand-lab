
/**
 * Lazy-loads inline SVG graphics as they enter the viewport using IntersectionObserver, sourcing vectors either from HTML templates or dynamic fetch requests.
 * 
 * 1. `initLazySvg` - Initializes observation for SVG receiver containers and manages the lazy-loading lifecycle.
 * 2. `insertSvg` - Clears the target element's contents and appends new SVG DOM elements.
 * 3. `loadFromTemplate` - Clones SVG markup from an existing `<template>` element and renders it into the target container.
 * 4. `loadFromFetch` - Asynchronously fetches raw SVG content via HTTP and injects the markup into the target container.
 * 5. `handleIntersection` - Processes viewport intersection, evaluates the loading strategy (template vs. fetch), updates state classes, and unobserves the element.
 */

export const initLazySvg = () => {
  const lazyContainers = document.querySelectorAll("[data-svg-receiver]");

  if (lazyContainers.length === 0) return;

  const options = {
    rootMargin: "150px 0px",
    threshold: 0.01,
  };

  const insertSvg = (container, content) => {
    container.innerHTML = "";
    container.appendChild(content);
  };

  const loadFromTemplate = (container, template, id) => {
    const clone = template.content.cloneNode(true);

    insertSvg(container, clone);

    console.log(`SVG ${id} loaded from template`);
  };

  const loadFromFetch = async (container, src, id) => {
    const response = await fetch(src);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const svgText = await response.text();

    container.innerHTML = svgText;

    console.log(`SVG ${id} loaded with fetch`);
  };

  const handleIntersection = async (entry, observer) => {
    if (!entry.isIntersecting) return;

    const container = entry.target;

    const id = container.dataset.svgId;
    const src = container.dataset.svgSrc;

    const template = document.getElementById(id);

    try {
      if (template?.content) {
        loadFromTemplate(container, template, id);
      } else if (src) {
        await loadFromFetch(container, src, id);
      }

      container.classList.add("_is-loaded");

      observer.unobserve(container);
    } catch (error) {
      console.error(`Lazy loading error ${id}:`, error);
    }
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      handleIntersection(entry, observer);
    });
  }, options);

  lazyContainers.forEach((container) => {
    observer.observe(container);
  });
};
