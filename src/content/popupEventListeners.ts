import { isChromeExtension } from "../utils/chrome";
import { handleOnOff } from "./eventHandlers/handleOnOff";
import { handleZoom } from "./eventHandlers/handleZoom";

export const initPopupEventListeners = () => {
  console.log("Initializing popup event listeners...");

  if (!isChromeExtension()) {
    console.log("Not in Chrome extension context, skipping event listeners");
    return;
  }

  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    console.log("Content script received message:", message);

    switch (message.type) {
      case "ping":
        // Respond to ping to confirm content script is ready
        console.log("Responding to ping...");
        sendResponse({ status: "ok", message: "Content script ready" });
        break;
      case "enable":
        console.log("Received enable event from popup:", message.payload);
        handleOnOff(message.payload.enable);
        sendResponse({
          status: "ok",
          message: "Enable updated successfully",
        });
        break;

      case "zoom":
        console.log("Received zoom event from popup:", message.payload);
        handleZoom(message.payload.zoom);
        sendResponse({
          status: "ok",
          message: "Zoom updated successfully",
        });
        break;

      default:
        // Handle unknown message types
        console.warn("Unknown message type received:", message.type);
        sendResponse({ status: "error", message: "Unknown message type" });
    }

    // Return true to indicate we will send a response asynchronously
    return true;
  });
};
