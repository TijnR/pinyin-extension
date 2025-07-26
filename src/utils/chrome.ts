/**
 * Utility functions for Chrome extension API interactions
 */

export const isChromeExtension = (): boolean => {
  return (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.id !== undefined
  );
};
