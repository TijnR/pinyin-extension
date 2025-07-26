import "./App.css";

const sendEventToContentScript = async (direction: "top" | "bottom") => {
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
    chrome.tabs.sendMessage(
      tab.id,
      { type: "direction", payload: { direction } },
      (response) => {
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
      }
    );
  } catch (error) {
    console.error("Error in sendEventToContentScript:", error);
  }
};

function App() {
  return (
    <>
      <img src="/logo.svg" alt="logo" className="w-40 mb-8" />
      <div className="flex flex-col gap-2">
        <button onClick={() => sendEventToContentScript("top")}>
          Show Top
        </button>
        <button onClick={() => sendEventToContentScript("bottom")}>
          Show Bottom
        </button>
      </div>
    </>
  );
}

export default App;
