/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse('from the background');
});

/******/ })()
;
//# sourceMappingURL=background.js.map