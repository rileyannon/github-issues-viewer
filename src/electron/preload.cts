const electron = require("electron");

electron.contextBridge.exposeInMainWorld("github", {
    test: () => electron.ipcRenderer.invoke("github-test")
});