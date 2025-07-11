const electron = require("electron");

electron.contextBridge.exposeInMainWorld("github", {
    GetRepoIssues: (owner : string, repo : string) => electron.ipcRenderer.invoke("getrepoissues", owner, repo)
});