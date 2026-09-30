
/**
 * Synchronously loads inline SVG HTML files, wraps them in HTML `<template>` elements with dynamic IDs, and appends them inside a hidden container to the DOM.
 * 
 * 1. `import.meta.glob` - Eagerly imports all inline SVG HTML files from the target icons directory as raw text strings.
 * 2. Icon Template Injector (Loop & Appender) - Extracts template IDs from filenames, constructs `<template>` tags for each SVG, and appends a hidden `<div>` containing all templates to `document.body`.
 */

const modules = import.meta.glob("/src/html/inline-icons/**/*.html", {
  query: "?raw",
  eager: true,
});

let templatesHTML = "";

for (const path in modules) {
  const id = path.split("/").pop().replace(".html", "");
  const svgContent = modules[path].default;

  templatesHTML += `
    <template id="${id}">
      ${svgContent}
    </template>
  `;
}

const div = document.createElement("div");
div.style.display = "none";
div.innerHTML = templatesHTML;
document.body.appendChild(div);
