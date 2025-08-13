chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "show-pinyin",
    title: "Show Pinyin",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "show-pinyin" && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "show-pinyin",
      payload: info.selectionText,
    });
  }
});
