const electron = require("electron");

electron.contextBridge.exposeInMainWorld("github", {
    GetRepoIssues: (owner : string, repo : string, pat : string) => electron.ipcRenderer.invoke("getrepoissues", owner, repo, pat)
});