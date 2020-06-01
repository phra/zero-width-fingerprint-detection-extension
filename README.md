# Zero-Width-Fingerprint-Detection-Extension

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does

This extension includes:

* a content script, "content-script.js", that is injected into all pages

The content script listens for `cut`/`copy`/`paste` events in the page it's attached to and it inspect the data to look for zero-width characters that can be used to insert hidden watermarks in the copied text.

## Note
* If the `copySelection` function was in a browser event `clipboardWrite` permissions would be required e.g.
```
"permissions": ["clipboardWrite"]
```
See [Interact with the clipboard](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard).
