const CONTEXT_MENU_IDS = {
  COPY_PINYIN_TO_CLIPBOARD: "copy-pinyin-to-clipboard",
  ADD_TO_COLLECTION: "add-to-collection",
} as const;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_IDS.COPY_PINYIN_TO_CLIPBOARD,
    title: "Copy Pinyin to Clipboard",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: CONTEXT_MENU_IDS.ADD_TO_COLLECTION,
    title: "Add to Collection",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText) return;

  if (info.menuItemId === CONTEXT_MENU_IDS.ADD_TO_COLLECTION) {
    // Get existing selections from sync storage
    chrome.storage.sync.get(["selection"], (result) => {
      const existingSelections = result.selection || [];

      // Add the new selection to the array
      const updatedSelections = [info.selectionText, ...existingSelections];

      // Store the updated array back to sync storage
      chrome.storage.sync.set(
        {
          selection: updatedSelections,
          activeTab: "collection",
          enable: false,
        },
        () => {
          chrome.action.openPopup();
        }
      );
    });
  }

  if (!tab?.id) return;

  if (info.menuItemId === CONTEXT_MENU_IDS.COPY_PINYIN_TO_CLIPBOARD) {
    chrome.tabs.sendMessage(tab.id, {
      type: "copy-pinyin-to-clipboard",
      payload: { selectionText: info.selectionText },
    });
  }
});
