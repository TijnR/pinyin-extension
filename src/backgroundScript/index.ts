chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "show-pinyin",
    title: "Show Pinyin",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "show-pinyin" && info.selectionText) {
    // Get existing selections from sync storage
    chrome.storage.sync.get(["selection"], (result) => {
      const existingSelections = result.selection || [];

      // Add the new selection to the array
      const updatedSelections = [...existingSelections, info.selectionText];

      // Store the updated array back to sync storage
      chrome.storage.sync.set({ selection: updatedSelections }, () => {
        chrome.action.openPopup();
      });
    });
  }
});
