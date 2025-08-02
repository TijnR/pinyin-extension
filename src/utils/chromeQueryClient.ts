export const chromeQueryClient = async (message: {
  type: string;
  payload: object;
}) => {
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) {
      console.error("No active tab found");
      return;
    }

    // Send the direction message with proper error handling
    chrome.tabs.sendMessage(tab.id, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error sending direction message:",
          chrome.runtime.lastError
        );
        // Show user-friendly error message
        alert(
          "Content script not ready. Please refresh the page and try again."
        );
        return;
      }
      console.log("Response from content script:", response);
      return response;
    });
  } catch (error) {
    console.error("Error in sendEventToContentScript:", error);
    throw Error("Error in sendEventToContentScript", { cause: error });
  }
};
