import { initPopupEventListeners } from "./popupEventListeners";
import { CLASS_SHOW_PINYIN, CLASS_SHOW_TOP } from "./const";
import { wrapChineseCharacters } from "./chineseWrapper";
import { initWindowTypes } from "./window";
import { chineseMutationObserver } from "./chineseMutationObserver";

function setDefaultBaseStyles(): void {
  document.body.classList.add(CLASS_SHOW_PINYIN);
  document.body.classList.add(CLASS_SHOW_TOP);
}

// Initialize when DOM is ready
function init(): void {
  console.log("Content script initializing...");

  // Always initialize popup event listeners first
  initPopupEventListeners();
  setDefaultBaseStyles();

  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wrapChineseCharacters);
  } else {
    wrapChineseCharacters();
  }

  // Also run when new content is added (for dynamic content)
  const observer = chineseMutationObserver();

  try {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } catch (error) {
    console.warn("Failed to start MutationObserver:", error);
  }

  initWindowTypes(observer);
}

init();
