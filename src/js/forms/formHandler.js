import { phoneMasks } from "../data/phoneMasks.js";
import { openModal } from "../components/modalManager.js";
import { errorMessages as translations } from "../data/errorMessages.js";

const currentLang = document.documentElement.lang || "en";
const errorMessages = translations[currentLang] || translations.en;

export function initFormHandler(formSelector) {
  let selector = formSelector || "[data-form]";

  if (
    typeof selector === "string" &&
    !selector.startsWith("#") &&
    !selector.startsWith(".") &&
    !selector.startsWith("[")
  ) {
    if (document.getElementById(selector)) {
      selector = `#${selector}`;
    }
  }

  const forms = document.querySelectorAll(selector);

  if (forms.length === 0) {
    console.warn(
      `[FormHandler Error]: Form with selector "${formSelector}" not found! Check the HTML ID and the call in main.js.`,
    );
    return;
  }

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, button");

    initPhoneMask(form);

    const consentCheckbox = form.querySelector('input[name="privacy-consent"]');
    const submitBtn = form.querySelector(".form__submit");

    const updateSubmitState = () => {
      if (consentCheckbox && submitBtn) {
        submitBtn.disabled = !consentCheckbox.checked;
      }
    };

    if (consentCheckbox) {
      consentCheckbox.addEventListener("change", updateSubmitState);
    }

    updateSubmitState();

    let isFormActive = false;

    const setFormKeyboardActive = (active) => {
      isFormActive = active;

      if (active) {
        inputs.forEach((element) => {
          element.setAttribute("tabindex", "0");
        });

        form.classList.add("_is-form-active");
      } else {
        inputs.forEach((element) => {
          element.setAttribute("tabindex", "-1");
        });

        form.classList.remove("_is-form-active");
      }
    };

    form.setAttribute("tabindex", "0");

    inputs.forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });

    form.addEventListener("click", () => {
      if (!isFormActive) {
        setFormKeyboardActive(true);
      }
    });

    form.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !isFormActive) {
        e.preventDefault();

        setFormKeyboardActive(true);

        setTimeout(() => {
          const firstInput = form.querySelector(
            "input:not([type='hidden']):not([hidden]), textarea",
          );

          if (firstInput) {
            firstInput.focus();
          }
        }, 0);
      }

      if (e.key === "Escape" && isFormActive) {
        e.preventDefault();

        setFormKeyboardActive(false);
        form.focus();
      }
    });

    form.addEventListener("focusout", (e) => {
      if (e.relatedTarget && form.contains(e.relatedTarget)) {
        return;
      }

      setFormKeyboardActive(false);
    });

    inputs.forEach((input) => {
      if (input.tagName === "BUTTON") return;

      input.addEventListener("blur", () => validateField(input));

      ["input", "change"].forEach((eventType) => {
        input.addEventListener(eventType, () => {
          const parent = input.closest(".form__input-box");

          if (
            input.type === "hidden" ||
            (parent && parent.classList.contains("_is-invalid"))
          ) {
            validateField(input);
          }
        });
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isFormValid = true;

      inputs.forEach((input) => {
        if (input.tagName === "BUTTON") return;

        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        handleFormSubmit(form);
      } else {
        const firstError = form.querySelector(
          "._is-invalid input, ._is-invalid textarea",
        );

        if (firstError) {
          firstError.focus();
        }
      }
    });
  });
}

function initPhoneMask(form) {
  const phoneInput = form.querySelector('input[type="tel"]');

  if (!phoneInput) return;

  const defaultCountryKey = form.dataset.country?.toLowerCase();
  const defaultCountry = phoneMasks[defaultCountryKey];

  if (defaultCountry) {
    phoneInput.placeholder = defaultCountry.mask;
  }

  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value && defaultCountry) {
      const countryCode = defaultCountry.mask.split(" ")[0];
      phoneInput.value = countryCode + " ";
    }
  });

  phoneInput.addEventListener("input", () => {
    let cursorPosition = phoneInput.selectionStart;
    const originalLength = phoneInput.value.length;

    let digits = phoneInput.value.replace(/\D/g, "");

    if (!digits) {
      phoneInput.value = "";
      return;
    }

    let matchedKey = null;

    const sortedCountries = Object.keys(phoneMasks).sort((a, b) => {
      return (
        phoneMasks[b].mask.replace(/\D/g, "").length -
        phoneMasks[a].mask.replace(/\D/g, "").length
      );
    });

    for (const key of sortedCountries) {
      const prefix = phoneMasks[key].mask.replace(/\D/g, "");

      if (digits.startsWith(prefix)) {
        matchedKey = key;
        break;
      }
    }

    if (!matchedKey && defaultCountryKey) {
      matchedKey = defaultCountryKey;
    }

    if (!matchedKey) {
      phoneInput.value = "+" + digits;
      return;
    }

    const config = phoneMasks[matchedKey];
    const mask = config.mask;

    digits = digits.substring(0, config.digits);

    let formatted = "";
    let digitIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (digitIndex >= digits.length) break;

      if (mask[i] === "X") {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += mask[i];

        if (mask[i] === digits[digitIndex]) {
          digitIndex++;
        }
      }
    }

    phoneInput.value = formatted;

    const newLength = phoneInput.value.length;

    cursorPosition += newLength - originalLength;

    phoneInput.setSelectionRange(cursorPosition, cursorPosition);
  });

  phoneInput.addEventListener("blur", () => {
    if (
      defaultCountry &&
      phoneInput.value.trim() === defaultCountry.mask.split(" ")[0]
    ) {
      phoneInput.value = "";
    }
  });
}

function validateField(input) {
  const parent = input.closest(".form__input-box");

  if (!parent) return true;

  const errorSpan = parent.querySelector(".form__error");
  const value = input.type === "checkbox" ? input.checked : input.value.trim();

  let isValid = true;
  let message = "";

  if (
    input.hasAttribute("required") &&
    (input.type === "checkbox" ? !input.checked : value === "")
  ) {
    isValid = false;
    message =
      input.name === "privacy-consent"
        ? errorMessages.privacyConsent
        : errorMessages.empty;
  } else if (input.name === "name" && value !== "") {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s\-]+$/;

    if (value.length < 2) {
      isValid = false;
      message = errorMessages.shortName;
    } else if (!nameRegex.test(value)) {
      isValid = false;
      message = errorMessages.invalidName;
    }
  } else if (input.type === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      isValid = false;
      message = errorMessages.invalidEmail;
    }
  } else if (input.type === "tel" && value !== "") {
    const digitsCount = value.replace(/\D/g, "").length;

    let expectedDigits = 0;

    for (const key in phoneMasks) {
      const prefix = phoneMasks[key].mask.replace(/\D/g, "");

      if (value.replace(/\D/g, "").startsWith(prefix)) {
        expectedDigits = phoneMasks[key].digits;
        break;
      }
    }

    if (expectedDigits === 0 || digitsCount !== expectedDigits) {
      isValid = false;
      message = errorMessages.invalidPhone;
    }
  }

  if (!isValid) {
    if (errorSpan) {
      errorSpan.textContent = message;
    }

    parent.classList.add("_is-invalid");
    parent.classList.remove("_is-valid");
  } else {
    if (errorSpan) {
      errorSpan.textContent =
        input.type === "checkbox" ? "" : value ? errorMessages.success : "";
    }

    parent.classList.remove("_is-invalid");

    if (value) {
      parent.classList.add("_is-valid");
    } else {
      parent.classList.remove("_is-valid");
    }
  }

  return isValid;
}

async function handleFormSubmit(form) {
  const submitBtn =
    form.querySelector(".form__submit") ||
    form.querySelector('button[type="submit"]');

  const btnTextEl = submitBtn
    ? submitBtn.querySelector("span") || submitBtn
    : null;

  const originalText = btnTextEl
    ? btnTextEl.textContent
    : errorMessages.ui.submit;

  if (submitBtn && btnTextEl) {
    btnTextEl.textContent = errorMessages.ui.sending;
    submitBtn.disabled = true;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(
      form.action || "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (response.ok && data.success) {
      form.reset();

      form.querySelectorAll(".form__input-box").forEach((box) => {
        box.classList.remove("_is-valid", "_is-invalid");

        const errorSpan = box.querySelector(".form__error");

        if (errorSpan) {
          errorSpan.textContent = "";
        }
      });

      const modalId = form.getAttribute("data-modal-success");
      const successModal = document.getElementById(modalId);

      if (successModal) {
        openModal(successModal);
      } else {
        alert(errorMessages.ui.successAlert);
      }
    } else {
      alert(
        errorMessages.ui.errorPrefix +
          (data.message || errorMessages.ui.defaultError),
      );
    }
  } catch (error) {
    alert(errorMessages.ui.connectionError);
    console.error("[FormHandler Fetch Error]:", error);
  } finally {
    if (submitBtn && btnTextEl) {
      btnTextEl.textContent = originalText;

      const consentCheckbox = form.querySelector(
        'input[name="privacy-consent"]',
      );

      submitBtn.disabled = consentCheckbox ? !consentCheckbox.checked : false;
    }
  }
}