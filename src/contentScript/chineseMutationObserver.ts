import { containsChineseCharacters } from "../utils/containsChineseCharacters";
import { wrapChineseCharacters } from "./chineseWrapper";
import { debouncedWrapChineseCharacters } from "./debounce";

export const chineseMutationObserver = () => {
  const observer = new MutationObserver(async (mutations) => {
    const { enable } = await chrome.storage.sync.get("enable");

    if (!enable) {
      return;
    }

    let shouldRewrap = false;

    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || "";
            if (containsChineseCharacters(text)) {
              shouldRewrap = true;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const text = element.textContent || "";
            if (containsChineseCharacters(text)) {
              shouldRewrap = true;
            }
          }
        });
      }
    });
    if (shouldRewrap) {
      debouncedWrapChineseCharacters(wrapChineseCharacters);
    }
  });

  return observer;
};
