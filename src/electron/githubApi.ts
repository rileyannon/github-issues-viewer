import { Octokit } from "octokit";
import { BrowserWindow } from "electron";


// TODO: Implement using Personal Access Token 
// Authentication is not required for public repos but will be throttled
const octokit = new Octokit({
    auth: "..."
});

export async function GetRepoIssues(owner : string, repo : string, mainWindow: BrowserWindow) {
    try {
        console.log(`Fetching issues for repo: ${owner}/${repo}`);

        const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
          owner: owner,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });

        mainWindow.webContents.send("getrepoissues", response.data);
        return response.data;
    } catch (err : Error | any) {
        //console.error("GitHub API error:", err);
        mainWindow.webContents.send("getrepoissues", { error: true, message: err.message });
        return { error: true, message: err.message };
    }
};