const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    getAppPath: () => electron.app.getAppPath(),
    test: () => console.log("Test function called from preload script"),
});