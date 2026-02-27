# Prompt Optimizer Extension

A lightweight, powerful Chrome Extension that intercepts your raw text in ChatGPT, Claude, and Gemini, and instantly upgrades it using an advanced LLM backend.

## Features
* **Universal Injection:** Seamlessly floats an "Optimize Prompt" button directly inside the UI of ChatGPT, Claude, and Gemini.
* **Instant Upgrades:** Transforms basic, lazy requests into highly structured, prompt-engineered masterpieces.
* **Native State Sync:** Bypasses complex React and ProseMirror DOMs to instantly update the host website's chat box without causing hydration errors.

---

## How to Install (Developer Mode)

Since this extension is fresh out of the oven and not yet listed on the official Chrome Web Store, you can install it manually in less than 60 seconds!

### Step 1: Download & Extract
1. Download the `prompt-optimizer.zip` file.
2. Extract/unzip the file to a permanent folder on your computer (e.g., `Documents/Prompt-Optimizer`). 
*> **Important:** Do not delete or move this folder after installing, or Chrome will lose access to the extension!*

### Step 2: Enable Developer Mode in Chrome
1. Open Google Chrome (or a Chromium browser like Brave/Edge).
2. Type `chrome://extensions/` into your address bar and hit **Enter**.
3. Look at the top right corner of the page and toggle **Developer mode** to **ON**.

### Step 3: Load the Extension
1. A new menu bar will appear at the top left of the extensions page. Click the **Load unpacked** button.
2. A file browser will open. Navigate to the folder where you extracted the `.zip` file.
3. Select that folder (make sure you are selecting the folder that contains the `manifest.json` file inside it) and click **Select/Open**.

That's it thank you.

---

## How to Use
1. Open a new tab and go to [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai), or [Gemini](https://gemini.google.com).
2. Look for the **Optimize Prompt** button hovering above the chat input box.
3. Type a basic prompt (e.g., `write a python script to scrape a website`).
4. Click **Optimize Prompt**. 
5. Wait a second, and watch the magic happen as your text is instantly replaced with a highly-engineered prompt, ready to be sent!

---

**Built with:** React, Vite, Node.js, Express, and Vercel.
