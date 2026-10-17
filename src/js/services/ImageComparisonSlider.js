export const initImageComparisonSlider = (
  containerSelector,
  wrapperSelector,
  handleSelector,
) => {
  document.querySelectorAll(containerSelector).forEach((container) => {
    const afterWrapper = container.querySelector(wrapperSelector);
    const handle = container.querySelector(handleSelector);

    if (!afterWrapper || !handle) return;

    const updateSlider = (clientX) => {
      const rect = container.getBoundingClientRect();

      if (!rect.width) return;

      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));

      const percent = (offsetX / rect.width) * 100;

      afterWrapper.style.clipPath = `inset(0 0 0 ${percent}%)`;
      handle.style.left = `${percent}%`;
    };

    handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;

      event.preventDefault();
      event.stopPropagation();

      handle.setPointerCapture(event.pointerId);
      container.classList.add("is-dragging");

      updateSlider(event.clientX);
    });

    handle.addEventListener("pointermove", (event) => {
      if (!handle.hasPointerCapture(event.pointerId)) return;

      updateSlider(event.clientX);
    });

    const stopDragging = (event) => {
      if (!handle.hasPointerCapture(event.pointerId)) return;

      handle.releasePointerCapture(event.pointerId);
      container.classList.remove("is-dragging");
    };

    handle.addEventListener("pointerup", stopDragging);
    handle.addEventListener("pointercancel", stopDragging);

    updateSlider(
      container.getBoundingClientRect().left +
        container.getBoundingClientRect().width / 2,
    );
  });
};

