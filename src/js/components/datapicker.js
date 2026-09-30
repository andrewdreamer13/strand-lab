export function initDatePicker() {
  const dateInput = document.getElementById("appointment-date");
  if (!dateInput) return;

  const handleFirstInteraction = async () => {
    const [{ default: flatpickr }, { default: confirmDatePlugin }] =
      await Promise.all([
        import("flatpickr"),
        import("flatpickr/dist/plugins/confirmDate/confirmDate"),
      ]);

    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(maxSelectableDate.getDate() + 30);

    const fpInstance = flatpickr(dateInput, {
      enableTime: true,
      dateFormat: "m/d/Y h:i K",
      minDate: "today",
      // maxDate: maxSelectableDate,
      monthSelectorType: "static",
      minuteIncrement: 30,
      disableMobile: true,

      plugins: [
        new confirmDatePlugin({
          confirmText: "OK",
          showAlways: false,
          theme: "dark",
        }),
      ],

      onClose: (selectedDates, dateStr, instance) => {
        const form = instance.element.form;
        const nextElement = form ? form.querySelector("textarea") : null;

        if (nextElement) {
          setTimeout(() => {
            nextElement.focus();
          }, 10);
        }
      },
    });

    fpInstance.open();
  };

  dateInput.addEventListener("focus", handleFirstInteraction, { once: true });
}
