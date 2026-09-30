
/**
 * Initializes accessible tab components using event delegation, managing active states and ARIA attributes across tab triggers and content panels.
 * 
 * 1. `initTabs` - Attaches click event delegation to tab container groups to switch active buttons and panels via `data-tab` targets while updating `aria-selected` and `aria-hidden` attributes.
 */

export const initTabs = (tabsSelector) => {
  const tabsGroups = document.querySelectorAll(tabsSelector);
  if (!tabsGroups.length) return;

  tabsGroups.forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tabs__button");
    const panels = tabs.querySelectorAll(".tabs__panel");

    tabs.addEventListener("click", (e) => {
      const button = e.target.closest(".tabs__button");
      if (!button || button.classList.contains("tabs__button--active")) return;

      const targetPanel = tabs.querySelector(`#${button.dataset.tab}`);
      if (!targetPanel) return;

      buttons.forEach((btn) => {
        btn.classList.remove("tabs__button--active");
        btn.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => {
        panel.classList.remove("tabs__panel--active");
        panel.setAttribute("aria-hidden", "true");
      });

      button.classList.add("tabs__button--active");
      button.setAttribute("aria-selected", "true");

      targetPanel.classList.add("tabs__panel--active");
      targetPanel.setAttribute("aria-hidden", "false");
    });
  });
};
