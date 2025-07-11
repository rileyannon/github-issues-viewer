import { useState } from 'react'
import { type IssueProps } from './Issue'
import Issue from './Issue'
import GitHubLogo from '../assets/GitHubIcon'
import './App.css'

function App() {
  const [owner, setOwner] = useState("rileyannon");
  const [repo, setRepo] = useState("gitkraken-assessment");
  const [issues, setIssues] = useState([]);

  const getRepoIssues = async (owner : string, repo : string) => {
      // using the ipcRenderer.invoke method exposed in preload.cts
      const resp = await window.github.GetRepoIssues(owner, repo);
      setIssues(resp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (owner && repo) getRepoIssues(owner, repo);
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
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>
            Owner:
            <input 
              type="text" 
              value={owner} 
              onChange={(e) => setOwner(e.target.value)} 
              placeholder="Enter repo owner" 
            />
          </label>
          <br />
          <label>
            Repo:
            <input 
              type="text" 
              value={repo} 
              onChange={(e) => setRepo(e.target.value)} 
              placeholder="Enter repo name" 
            />
          </label>
          <br />
          <button type="submit">Get Issues</button>
        </form>            
        <br />
      </div>            
      <table className="issues-table">
        <tbody>
          {issues.map((issue: any) => (
            <Issue key={issue.id} {...mapGitHubIssueToIssueProps(issue)} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App