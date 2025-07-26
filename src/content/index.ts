import { containsChineseCharacters } from "../utils/containsChineseCharacters/containsChineseCharacters";
import { pinyin as pinyinPro } from "pinyin-pro";
import { initPopupEventListeners } from "./popupEventListeners";
import { CLASS_SHOW_TOP } from "./const";

// Track processed nodes to avoid infinite loops
const processedNodes = new Set<Node>();
let isProcessing = false;

// Safe pinyin generation with error handling
function safeGetPinyin(char: string): string {
  try {
    const pinyin = pinyinPro(char);
    return pinyin.split(" ").join("");
  } catch (error) {
    console.warn("Pinyin generation failed for character:", char, error);
    return "";
  }
}

// Check if element should be processed
function shouldProcessElement(element: Element): boolean {
  // Skip if already processed
  if (processedNodes.has(element)) return false;

  // Skip script, style, and other non-content elements
  const skipTags = ["SCRIPT", "STYLE", "NOSCRIPT", "META", "LINK", "TITLE"];
  if (skipTags.includes(element.tagName)) return false;

  // Skip SVG elements entirely - they're too fragile
  if (element.tagName === "SVG" || element.closest("svg")) return false;

  // Skip elements with specific classes that might be interactive
  const skipClasses = ["chinese-pinyin", "pinyin-processed"];
  if (skipClasses.some((cls) => element.classList.contains(cls))) return false;

  return true;
}

// Function to wrap Chinese characters in span elements
function wrapChineseCharacters(): void {
  if (isProcessing) return; // Prevent concurrent processing

  try {
    isProcessing = true;

    // Get all text nodes in the document
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if already processed
          if (processedNodes.has(node)) return NodeFilter.FILTER_REJECT;

          // Skip if parent shouldn't be processed
          if (node.parentElement && !shouldProcessElement(node.parentElement)) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

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

    console.log(
      `Found ${textNodesToProcess.length} text nodes with Chinese characters`
    );

    // Process each text node that contains Chinese characters
    textNodesToProcess.forEach((textNode) => {
      try {
        const text = textNode.textContent || "";
        const parent = textNode.parentElement;

        if (!parent || !shouldProcessElement(parent)) {
          console.log("Skipping text node - parent not processable");
          return;
        }

        // Mark as processed to prevent re-processing
        processedNodes.add(textNode);

        // Create a document fragment to hold the processed content
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        // Find and wrap each Chinese character
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (containsChineseCharacters(char)) {
            const pinyin = safeGetPinyin(char);

            // Add text before the Chinese character
            if (i > lastIndex) {
              fragment.appendChild(
                document.createTextNode(text.substring(lastIndex, i))
              );
            }

            // Create span for the Chinese character
            const span = document.createElement("span");
            span.dataset.pinyin = pinyin;
            span.className = "chinese-pinyin pinyin-processed";
            span.textContent = char;
            fragment.appendChild(span);

            lastIndex = i + 1;
          }
        }

        // Add remaining text after the last Chinese character
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        }

        // Replace the original text node with the processed fragment
        parent.replaceChild(fragment, textNode);
      } catch (error) {
        console.warn("Error processing text node:", error);
        // Mark as processed to prevent infinite retries
        processedNodes.add(textNode);
      }
    });
  } catch (error) {
    console.error("Error in wrapChineseCharacters:", error);
  } finally {
    isProcessing = false;
  }
}

// Debounced version to prevent excessive calls
let debounceTimer: number | null = null;
function debouncedWrapChineseCharacters(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    wrapChineseCharacters();
  }, 100);
}

// Initialize when DOM is ready
function init(): void {
  console.log("Content script initializing...");

  // Always initialize popup event listeners first
  initPopupEventListeners();
  document.body.classList.add(CLASS_SHOW_TOP);

  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wrapChineseCharacters);
  } else {
    wrapChineseCharacters();
  }
}

init();

// Also run when new content is added (for dynamic content)
const observer = new MutationObserver((mutations) => {
  let shouldRewrap = false;

  mutations.forEach((mutation) => {
    // Skip if we're currently processing
    if (isProcessing) return;

    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        // Skip if already processed
        if (processedNodes.has(node)) return;

        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (containsChineseCharacters(text)) {
            shouldRewrap = true;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (shouldProcessElement(element)) {
            const text = element.textContent || "";
            if (containsChineseCharacters(text)) {
              shouldRewrap = true;
            }
          }
        }
      });
    }
  });

  if (shouldRewrap) {
    debouncedWrapChineseCharacters();
  }
});

// Start observing for DOM changes with error handling
try {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
} catch (error) {
  console.warn("Failed to start MutationObserver:", error);
}

// Cleanup function (optional - for when extension is disabled)
function cleanup(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  observer.disconnect();
  processedNodes.clear();
}

// Expose cleanup for potential use
(
  window as Window & typeof globalThis & { pinyinExtensionCleanup?: () => void }
).pinyinExtensionCleanup = cleanup;
