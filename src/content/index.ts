import { containsChineseCharacters } from "../utils/containsChineseCharacters";
import { pinyin as pinyinPro } from "pinyin-pro";

// Function to wrap Chinese characters in span elements
function wrapChineseCharacters(): void {
  // Get all text nodes in the document
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  const textNodesToProcess: Text[] = [];
  let node: Node | null;

  // Collect all text nodes that contain Chinese characters
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (containsChineseCharacters(text)) {
        textNodesToProcess.push(node as Text);
      }
    }
  }

  // Process each text node that contains Chinese characters
  textNodesToProcess.forEach((textNode) => {
    const text = textNode.textContent || "";
    const parent = textNode.parentElement;

    if (!parent) return;

    // Create a document fragment to hold the processed content
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    // Find and wrap each Chinese character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (containsChineseCharacters(char)) {
        const pinyin = pinyinPro(char);
        // Add text before the Chinese character
        if (i > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, i))
          );
        }

        // Create span for the Chinese character
        const span = document.createElement("span");
        span.dataset.pinyin = pinyin.split(" ").join("");
        span.className = "chinese-text-blue";
        span.textContent = char;
        fragment.appendChild(span);

        lastIndex = i + 1;
      }
    }

    // Add remaining text after the last Chinese character
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Replace the original text node with the processed fragment
    parent.replaceChild(fragment, textNode);
  });
}

// Initialize when DOM is ready
function init(): void {
  wrapChineseCharacters();
}

init();

// Also run when new content is added (for dynamic content)
const observer = new MutationObserver((mutations) => {
  let shouldRewrap = false;

  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (containsChineseCharacters(text)) {
            shouldRewrap = true;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const text = element.textContent || "";
          if (containsChineseCharacters(text)) {
            shouldRewrap = true;
          }
        }
      });
    }
  });

  if (shouldRewrap) {
    wrapChineseCharacters();
  }
});

// Start observing for DOM changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
