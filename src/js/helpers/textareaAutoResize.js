export const initTextareaResize = () => {
  const textareas = document.querySelectorAll(".form__textarea");

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      const scrollH = textarea.scrollHeight;
      const maxHeight = 160; 

      if (scrollH >= maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto"; 
      } else {
        textarea.style.height = `${scrollH}px`;
        textarea.style.overflowY = "hidden"; 
      }
    });
  });
};
