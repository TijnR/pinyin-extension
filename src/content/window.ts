import { cleanup } from "./cleanup";

export const initWindowTypes = (observer: MutationObserver) =>
  ((
    window as Window &
      typeof globalThis & { pinyinExtensionCleanup?: () => void }
  ).pinyinExtensionCleanup = () => cleanup(observer));
