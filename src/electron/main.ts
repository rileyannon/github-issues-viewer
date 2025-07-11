import { app, BrowserWindow, ipcMain } from 'electron';
import { getPreloadPath } from './pathResolver.js';
import path from 'path';
import { isDev } from './util.js';
import { GetRepoIssues } from './githubApi.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        title: "GitKraken Assessment",
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL("http://localhost:5173");     
        mainWindow.maximize();   
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
        mainWindow.maximize();
    }

    // ignore event for now, just worry about args
    ipcMain.handle("getrepoissues", (_, owner, repo, pat) => {
        return GetRepoIssues(owner, repo, pat, mainWindow);
    });
})