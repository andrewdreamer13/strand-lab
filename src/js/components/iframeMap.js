/**
 * Dynamically creates and injects an iframe element into a container using data attributes, updating its loaded state.
 *
 * 1. `initIframeMap` - Validates the `data-map-src` attribute, creates and appends an `iframe` to the target container, and sets the `_is-loaded` class.
 */

export const initIframeMap = (container) => {
  const { mapSrc } = container.dataset;

  if (!mapSrc) {
    console.error("Для типа 'iframe' необходимо указать data-map-src");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = mapSrc;

  container.appendChild(iframe);
  container.classList.add("_is-loaded");
  console.log("Iframe map loaded");
};
