import { useState, useEffect } from 'react'
import { type IssueProps } from './Issue'
import Issue from './Issue'
import GitHubLogo from '../assets/GitHubIcon'
import './App.css'

function App() {
  // user input states
  const [owner, setOwner] = useState("rileyannon");
  const [repo, setRepo] = useState("gitkraken-assessment");
  const [pat, setPat] = useState("");

  // issues and pagination states
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // manage error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // on update component, if issues are fetched, set the first page
  useEffect(() => {
    if (issues.length > 0) {
      setPage(issues[0] || []);
      setPageCount(issues.length);
    }
  }, [issues])

  const getRepoIssues = async (owner : string, repo : string, pat : string) => {
      // using the ipcRenderer.invoke method exposed in preload.cts
      const resp = await window.github.GetRepoIssues(owner, repo, pat);

      if (resp.error) {
        console.error("Error fetching issues:", resp.message);
        setError(resp.message);
        setSuccess("");
        setPage([]); // clear page on error
        return;
      }

      // reset error state
      setError("");
      const totalIssues = (resp as Array<Array<object>>).reduce((sum, page) => sum + page.length, 0);
      setSuccess(`Successfully fetched ${totalIssues} issues (${resp.length} pages) for ${owner}/${repo}`);

      resp.reverse(); // reverse the order to show most recent issues first
      setIssues(resp);

      setPageNumber(0);
      setPage(issues[0] || [])
      setPageCount(resp.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (owner && repo) getRepoIssues(owner, repo, pat);
  };

  const selectPage = (pageNumber : number) => {
    if (pageNumber < 0 || pageNumber >= issues.length) return;
    setPageNumber(pageNumber);
    setPage(issues[pageNumber] || []);
  };

  const mapGitHubIssueToIssueProps = (issue: any): IssueProps => {
    return {
        url: issue.html_url,
        title: issue.title,
        body: issue.body,
        id: issue.id,
        number: issue.number,
        state: issue.state,
        createdAt: new Date(issue.created_at),
        updatedAt: new Date(issue.updated_at),
        user: {
            login: issue.user.login,
            profileUrl: issue.user.html_url,
            avatarUrl: issue.user.avatar_url
        }
    };
}


  return (
    <>
      <div>
      </div>
      <div className="title"><GitHubLogo/><h1>Simple GitHub Issues</h1></div>
      <h4>By Riley Annon</h4>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>
            Owner: 
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Enter repo owner" />
          </label>
          <br />
          <label>
            Repo: 
            <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Enter repo name" />
          </label>
          <br />
          <label>
            Personal Access Token (optional): 
            <input type="text" value={pat} onChange={(e) => setPat(e.target.value)} placeholder="Enter personal access token" />
          </label>
          <br/><br/>
          <button type="submit">Get Issues</button>
        </form>            
        <br />
        <h3 id="success">{success}</h3>
        <h3 id="error">{error}</h3>
      </div>
      
        {issues.length > 0 && (
          <div>
            <button className="page-button" onClick={() => selectPage(pageNumber - 1)}>←</button> 
            {Array.from({ length: pageCount }, (_, i) => (
              <button className="page-button" key={i} onClick={() => selectPage(i)} disabled={i === pageNumber} style={{fontWeight: i === pageNumber ? 'bold' : 'normal'}}>
                {i + 1}
              </button>
            ))}
            <button className="page-button" onClick={() => selectPage(pageNumber + 1)}>→</button>  
          </div> 
        )}    
          
      <table className="issues-table">
        <thead>
          <tr>
            <th>Title</th>            
            <th>User</th>
            <th>Body</th>
            <th>State</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {page.map((issue: any) => (
            <Issue key={issue.id} {...mapGitHubIssueToIssueProps(issue)} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App