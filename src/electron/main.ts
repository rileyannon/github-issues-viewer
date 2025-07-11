import { app, BrowserWindow, ipcMain } from 'electron';
import { getPreloadPath } from './pathResolver.js';
import path from 'path';
import { isDev } from './util.js';
import { Test } from './githubApi.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        title: "GitKraken Assessment",
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL("http://localhost:5173");        
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
    }

    //Test(mainWindow);

    ipcMain.handle("github-test", () => {
        return Test(mainWindow);
    });
})