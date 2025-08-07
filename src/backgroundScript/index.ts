chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "test",
    title: "Test",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "test" && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "TEST",
      payload: info.selectionText,
    });
  }
});
