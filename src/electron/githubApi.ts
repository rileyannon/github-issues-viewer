// import { Octokit, App } from "octokit";
import { BrowserWindow } from "electron";

// TODO: Implement using Personal Access Token 
// Authentication is not required for public repos but will be throttled
// const octokit = new Octokit({});

export function Test(mainWindow: BrowserWindow) {
    const message = "Test function called from githubApi.ts";
    mainWindow.webContents.send("github-test", message);
    return message;
};