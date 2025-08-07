// Debounced version to prevent excessive calls
export class Debouncer {
  private debounceTimer: number | undefined = undefined;

  constructor() {
    this.debounceTimer = undefined;
  }

  debouncedWrapChineseCharacters = (wrapFunction: () => void): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = window.setTimeout(() => {
      wrapFunction();
    }, 100);
  };

  clearDebounceTimer = (): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = undefined;
    }
  };

  getDebounceTimer = (): number | undefined => {
    return this.debounceTimer;
  };
}

// Create a single instance (singleton)
const debouncer = new Debouncer();

// Export the public functions from the singleton instance
export const {
  debouncedWrapChineseCharacters,
  clearDebounceTimer,
  getDebounceTimer,
} = debouncer;
