import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

// Check if we're running in a Chrome extension context
const isChromeExtension = () => {
  return Boolean(
    typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.id &&
      chrome.storage
  );
};

interface ChromeStorageChange {
  [key: string]: chrome.storage.StorageChange;
}

export const useChromeState = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  // If in Chrome extension context, sync with storage
  useEffect(() => {
    if (isChromeExtension()) {
      // Load initial value from Chrome storage
      chrome.storage.sync.get([key], (result: { [key: string]: T }) => {
        if (result[key] !== undefined) {
          setState(result[key]);
        }
      });

      // Listen for storage changes
      const handleStorageChange = (changes: ChromeStorageChange) => {
        if (changes[key]) {
          setState(changes[key].newValue);
        }
      };

      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => chrome.storage.onChanged.removeListener(handleStorageChange);
    }
  }, [key]);

  // Custom setter that also updates Chrome storage when available
  const setStateWithStorage: Dispatch<SetStateAction<T>> = (value) => {
    setState((prevState) => {
      const newValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(prevState)
          : value;

      if (isChromeExtension()) {
        chrome.storage.sync.set({ [key]: newValue });
      }

      return newValue;
    });
  };

  return [state, setStateWithStorage];
};
