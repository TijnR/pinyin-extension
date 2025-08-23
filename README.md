# Pinyin Pro

Pinyin Pro is a Chrome extension that displays pinyin above Chinese text, making it easier to read and learn Mandarin.

<img width="2044" height="1033" alt="pinyin-pro-showcase" src="https://github.com/user-attachments/assets/321107bf-9497-43d1-a65e-3caac166d71b" />

## Features

- **Auto Mode:** Automatically detects Chinese text on web pages and adds pinyin where needed.
- **Selection Mode:** Select any Chinese text and view its pinyin in the extension pop-up.

Perfect for learners and anyone who wants quick access to pinyin while browsing.

## Getting Started

1.  Clone the repository:git clone https://github.com/TijnR/pinyin-extension.git
    cd pinyin-extension

2.  Install dependencies:pnpm install

3.  Run in development (popup only) mode:pnpm dev

4.  Build the extension:pnpm build

5.  Load the extension in Chrome:
    ▫ Go to ‎`chrome://extensions`
    ▫ Enable “Developer mode”
    ▫ Click “Load unpacked” and select the ‎`dist` folder

## Privacy Policy

- **What the extension does**: Adds pinyin overlays locally in your browser. No account or sign‑in required.
- **Data collection**: I do not collect, transmit, or sell personal data. No analytics, tracking pixels, or remote logging.
- **Processing**: Page text is processed locally by the content script to generate pinyin. The extension does not send page content to any server.
- **Storage**: Uses `chrome.storage` to save preferences (e.g., on/off state, mode, per‑site settings). No page content or browsing history is stored.
- **Permissions**:
  - **tabs / activeTab**: Apply pinyin on the page you are viewing when you activate the extension.
  - **storage**: Persist your preferences locally.
  - **contextMenus**: Provide optional right‑click actions for convenience.
- **Remote code**: The extension does not execute remote code; all scripts and fonts are bundled with the extension package.
- **Third‑party services**: None.
- **Delete your data**: Remove the extension from Chrome to delete its stored preferences. Reinstalling starts with a clean state.
- **Questions or issues**: Open an issue on the [GitHub issue tracker](https://github.com/TijnR/pinyin-extension/issues).
