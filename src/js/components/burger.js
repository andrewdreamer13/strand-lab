
/**
 * Initializes the responsive mobile navigation burger menu, managing UI state classes, accessibility attributes, Escape key listeners, and focus trapping.
 * 
 * 1. `initBurger` - Sets up toggle events for the burger button and menu, manages body scroll locks and ARIA states, handles Escape key closing, traps focus within the active menu via `focusManager`, and auto-closes upon link navigation.
 */

import { openScope, closeScope } from "../services/focusManager.js";

export const initBurger = (btnSelector, menuSelector, listSelector) => {
  const burger = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  if (!burger || !menu) return;

  const list = menu.querySelector(listSelector);
  const body = document.body;
  const isMenuOpen = () => menu.classList.contains("is-open");

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isMenuOpen()) {
      closeMenu();
    }
  };

  const openMenu = () => {
    burger.classList.add("is-active");
    menu.classList.add("is-open");
    body.classList.add("menu-open");

    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");

    document.addEventListener("keydown", handleEscapeKey);
    openScope(menu);
  };

  const closeMenu = () => {
    burger.classList.remove("is-active");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");

    document.removeEventListener("keydown", handleEscapeKey);
    closeScope();
  };

  const toggleMenu = () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  burger.addEventListener("click", toggleMenu);

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      setTimeout(closeMenu, 300);
      return;
    }

    if (list && e.target === list) {
      closeMenu();
    }
  });
};
