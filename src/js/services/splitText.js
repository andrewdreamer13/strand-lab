
export function splitTextIntoSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    if (!element || element.querySelector(".word")) return;

    const originalText = element.textContent;
    element.innerHTML = "";

    const words = originalText.split(" ");

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      for (let char of word) {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        wordSpan.append(charSpan);
      }

      element.append(wordSpan);

      if (wordIndex < words.length - 1) {
        element.append(document.createTextNode("\u00A0"));
      }
    });
  });
}
