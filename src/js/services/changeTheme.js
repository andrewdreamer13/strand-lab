
/**
 * Toggles the application theme between light and dark modes and persists the selection in local storage.
 * 
 * 1. `initChangeTheme` - Attaches a click event listener to the theme toggle button, toggling the `data-theme` attribute on the root HTML element and saving the state in `localStorage`.
 */

export function initChangeTheme(buttonSelector) {
  const changeThemeBtn = document.querySelector(buttonSelector);
  if (!changeThemeBtn) return;

  changeThemeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
  });
}
