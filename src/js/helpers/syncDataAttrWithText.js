export function initSyncDataAttrWithText(
  selector = ".main-title__word",
  attrName = "text",
) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const fullAttrName = `data-${attrName}`;

  elements.forEach((el) => {
    const currentText = el.textContent.trim();
    if (el.getAttribute(fullAttrName) !== currentText) {
      el.setAttribute(fullAttrName, currentText);
    }
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const targetEl =
        mutation.target.nodeType === Node.ELEMENT_NODE
          ? mutation.target.closest(selector)
          : mutation.target.parentElement?.closest(selector);

      if (targetEl) {
        const currentText = targetEl.textContent.trim();
        if (targetEl.getAttribute(fullAttrName) !== currentText) {
          targetEl.setAttribute(fullAttrName, currentText);
        }
      }
    });
  });

  elements.forEach((el) => {
    observer.observe(el, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });

  return () => observer.disconnect();
}
