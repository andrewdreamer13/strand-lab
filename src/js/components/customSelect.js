/**
 * Initializes accessible custom select components with support for dynamic option rendering, single-open instance management, and full mouse and keyboard navigation.
 *
 * 1. `initCustomSelect` - Dynamically populates options, creates internal state handlers, and initializes event bindings for custom select dropdown elements.
 * 2. `initMouseEvents` - Attaches click listeners for toggling dropdown state, selecting options, and closing the menu when clicking outside.
 * 3. `initKeyboardEvents` - Configures keyboard navigation (Arrow keys, Enter, Space, Escape, Tab) for accessible option selection and focus management.
 */

let currentlyOpenSelect = null;

export function initCustomSelect(target, optionsData = null) {
  const selectWrappers =
    typeof target === "string" ? document.querySelectorAll(target) : [target];

  selectWrappers.forEach((selectWrapper) => {
    if (!selectWrapper) return;

    const button = selectWrapper.querySelector(".select__button");
    const menu = selectWrapper.querySelector(".select__options");
    const input = selectWrapper.querySelector(".select__input");

    if (!button || !menu) return;

    const initialButtonText = button.textContent;

    if (optionsData && Array.isArray(optionsData)) {
      menu.innerHTML = optionsData
        .map((item) => {
          const value = item.value !== undefined ? item.value : item;
          const label = item.label !== undefined ? item.label : item;
          return `<li class="select__option" role="option" data-value="${value}">${label}</li>`;
        })
        .join("");
    }

    const options = selectWrapper.querySelectorAll(".select__option");

    menu.setAttribute("tabindex", "-1");
    options.forEach((option) => option.setAttribute("tabindex", "-1"));

    const state = {
      isOpen: false,

      toggle(forceState) {
        const nextState = forceState !== undefined ? forceState : !this.isOpen;

        if (nextState && currentlyOpenSelect && currentlyOpenSelect !== this) {
          currentlyOpenSelect.toggle(false);
        }

        this.isOpen = nextState;

        button.setAttribute("aria-expanded", this.isOpen);
        button.classList.toggle("rotate", this.isOpen);
        menu.classList.toggle("select__options--visible", this.isOpen);

        if (this.isOpen) {
          currentlyOpenSelect = this;
        } else if (currentlyOpenSelect === this) {
          currentlyOpenSelect = null;
        }
      },

      focusOption(index) {
        if (options.length === 0) return;

        if (index >= options.length) index = 0;
        if (index < 0) index = options.length - 1;

        options[index].focus();
      },

      selectOption(option) {
        if (!option) return;

        button.textContent = option.textContent.trim();
        button.classList.add("is-selected");

        if (input) {
          input.value = option.getAttribute("data-value") || "";
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }

        this.toggle(false);
        button.focus();
      },

      reset() {
        button.textContent = initialButtonText;
        button.classList.remove("is-selected");

        if (input) {
          input.value = "";
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }

        this.toggle(false);
      },
    };

    const parentForm = selectWrapper.closest("form");
    if (parentForm) {
      parentForm.addEventListener("reset", () => {
        state.reset();
      });
    }

    initMouseEvents(selectWrapper, button, options, state);
    initKeyboardEvents(button, menu, options, state);
  });
}

function initMouseEvents(selectWrapper, button, options, state) {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    state.toggle();
  });

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      state.selectOption(option);
    });
  });

  document.addEventListener("click", (e) => {
    if (state.isOpen && !selectWrapper.contains(e.target)) {
      state.toggle(false);
    }
  });
}

function initKeyboardEvents(button, menu, options, state) {
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      state.toggle();
      if (state.isOpen) state.focusOption(0);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!state.isOpen) state.toggle(true);
      state.focusOption(0);
    } else if (e.key === "Tab") {
      if (state.isOpen) state.toggle(false);
    }
  });

  menu.addEventListener("keydown", (e) => {
    if (!state.isOpen) return;

    const currentIndex = Array.from(options).indexOf(document.activeElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        state.focusOption(currentIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        state.focusOption(currentIndex - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (currentIndex !== -1) {
          state.selectOption(options[currentIndex]);
        }
        break;
      case "Escape":
      case "Esc":
        e.preventDefault();
        state.toggle(false);
        button.focus();
        break;
      case "Tab":
        state.toggle(false);
        break;
    }
  });
}