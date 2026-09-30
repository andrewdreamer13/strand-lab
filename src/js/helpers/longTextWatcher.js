export function initLongTextWatcher(
  selector = ".main-title__word",
  maxLength = 10,
  className = "is-long",
) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const updateClass = (el) => {
    const textLength = el.textContent.trim().length;
    el.classList.toggle(className, textLength > maxLength);
  };

  elements.forEach(updateClass);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const targetEl =
        mutation.target.nodeType === Node.ELEMENT_NODE
          ? mutation.target.closest(selector)
          : mutation.target.parentElement?.closest(selector);

      if (targetEl) {
        updateClass(targetEl);
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
