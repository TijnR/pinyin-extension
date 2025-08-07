import { clearProcessedNodes } from "./chineseWrapper";
import { clearDebounceTimer } from "./debounce";

export function cleanup(observer: MutationObserver): void {
  clearDebounceTimer();
  observer.disconnect();
  clearProcessedNodes();
}
