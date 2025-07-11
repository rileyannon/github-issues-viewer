import { Octokit } from "octokit";
import { BrowserWindow } from "electron";


// authentication is not required for public repos but will be throttled 
const octokit = new Octokit({});

// would be nice to be able to set this on the frontend (if there was time)
const PAGE_SIZE = 25;

export async function GetRepoIssues(owner : string, repo : string, pat : string, mainWindow: BrowserWindow) {
    try {
        console.log(`Fetching issues for repo: ${owner}/${repo}`);

        console.log(pat);

        // if a personal access token is provided, use it
        const octokitInstance = pat
            ? new Octokit({ auth: pat })
            : octokit;

        const pages = [];
        for await (const { data: issues } of octokitInstance.paginate.iterator(octokitInstance.rest.issues.listForRepo,
          {
            owner,
            repo,
            per_page: PAGE_SIZE,
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
          }
        )) 
        {
          pages.push(issues); 
        }
        
        console.log(`Fetched ${pages.length} pages of issues for ${owner}/${repo} (page size: ${PAGE_SIZE})`);
        mainWindow.webContents.send("getrepoissues", pages);
        return pages;
    } catch (err : Error | any) {
        //console.error("GitHub API error:", err);
        mainWindow.webContents.send("getrepoissues", { error: true, message: err.message });
        return { error: true, message: err.message };
    }
};