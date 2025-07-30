import { containsChineseCharacters } from "../utils/containsChineseCharacters/containsChineseCharacters";
import { pinyin as pinyinPro } from "pinyin-pro";

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

// Find text nodes containing Chinese characters
function findTextNodesWithChinese(): Text[] {
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

  return textNodesToProcess;
}

// Process a single text node
function processTextNode(textNode: Text): void {
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
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Replace the original text node with the processed fragment
    parent.replaceChild(fragment, textNode);
  } catch (error) {
    console.warn("Error processing text node:", error);
    // Mark as processed to prevent infinite retries
    processedNodes.add(textNode);
  }
}

// Main function to wrap Chinese characters in span elements
export function wrapChineseCharacters(): void {
  if (isProcessing) return; // Prevent concurrent processing

  try {
    isProcessing = true;

    const textNodesToProcess = findTextNodesWithChinese();

    console.log(
      `Found ${textNodesToProcess.length} text nodes with Chinese characters`
    );

    // Process each text node that contains Chinese characters
    textNodesToProcess.forEach(processTextNode);
  } catch (error) {
    console.error("Error in wrapChineseCharacters:", error);
  } finally {
    isProcessing = false;
  }
}

// Export for cleanup
export function clearProcessedNodes(): void {
  processedNodes.clear();
}

export function getProcessedNodesCount(): number {
  return processedNodes.size;
}
