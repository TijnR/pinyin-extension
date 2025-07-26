import { isChromeExtension } from "../utils/chrome";
import { CLASS_SHOW_BOTTOM, CLASS_SHOW_TOP } from "./const";

export const initPopupEventListeners = () => {
  console.log("Initializing popup event listeners...");

  if (!isChromeExtension()) {
    console.log("Not in Chrome extension context, skipping event listeners");
    return;
  }

  console.log("Setting up message listener...");
  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    console.log("Content script received message:", message);

    if (message.type === "ping") {
      // Respond to ping to confirm content script is ready
      console.log("Responding to ping...");
      sendResponse({ status: "ok", message: "Content script ready" });
    } else if (message.type === "direction") {
      try {
        const direction = message.payload.direction;
        // Handle the event
        console.log("Received direction event from popup:", message.payload);
        document.body.classList.add(
          direction === "bottom" ? CLASS_SHOW_BOTTOM : CLASS_SHOW_TOP
        );
        document.body.classList.remove(
          direction === "bottom" ? CLASS_SHOW_TOP : CLASS_SHOW_BOTTOM
        );

        // Send a response immediately
        sendResponse({
          status: "ok",
          message: "Direction updated successfully",
        });
      } catch (error) {
        console.error("Error handling direction message:", error);
        sendResponse({
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      // Handle unknown message types
      console.warn("Unknown message type received:", message.type);
      sendResponse({ status: "error", message: "Unknown message type" });
    }

    // Return true to indicate we will send a response asynchronously
    return true;
  });
};
