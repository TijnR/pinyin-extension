import { containsChineseCharacters } from "../utils/containsChineseCharacters";

// Function to find and style elements with Chinese characters
function styleChineseElements(): void {
  // Get all text nodes and elements in the document
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
  );

  const elementsToStyle = new Set<Element>();
  let node: Node | null;

  // Walk through all nodes to find those with Chinese characters
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (containsChineseCharacters(text)) {
        // Find the closest element parent
        let parent = node.parentElement;
        while (parent && parent !== document.body) {
          elementsToStyle.add(parent);
          parent = parent.parentElement;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const text = element.textContent || "";
      if (containsChineseCharacters(text)) {
        elementsToStyle.add(element);
      }
    }
  }

  // Add blue class to all elements containing Chinese characters
  elementsToStyle.forEach((element) => {
    element.classList.add("chinese-text-blue");
  });
}

// Initialize when DOM is ready
function init(): void {
  styleChineseElements();
}

init();

// Also run when new content is added (for dynamic content)
const observer = new MutationObserver((mutations) => {
  let shouldRestyle = false;

  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE ||
          node.nodeType === Node.TEXT_NODE
        ) {
          const text = node.textContent || "";
          if (containsChineseCharacters(text)) {
            shouldRestyle = true;
          }
        }
      });
    }
  });

  if (shouldRestyle) {
    styleChineseElements();
  }
});

// Start observing for DOM changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
