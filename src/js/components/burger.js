
import { openScope, closeScope } from "../services/focusManager.js";

export const initBurger = (btnSelector, menuSelector) => {
  const burger = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  if (!burger || !menu) return;

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
    body.classList.add("lock");

    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");

    document.addEventListener("keydown", handleEscapeKey);
    openScope(menu);
  };

  const closeMenu = () => {
    burger.classList.remove("is-active");
    menu.classList.remove("is-open");
    body.classList.remove("lock");

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

   
    if (e.target === menu) {
      closeMenu();
    }
  });
};

