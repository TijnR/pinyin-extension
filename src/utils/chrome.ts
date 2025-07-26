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

export const sendMessageToExtension = (message: unknown): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (!isChromeExtension()) {
      reject(new Error("Chrome extension API not available"));
      return;
    }

    try {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const sendDirectionMessage = (direction: string): Promise<unknown> => {
  return sendMessageToExtension({
    type: "direction",
    payload: { direction },
  });
};
