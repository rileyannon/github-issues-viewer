import { useState } from 'react'
import './App.css'

function App() {
  const [owner, setOwner] = useState("rileyannon");
  const [repo, setRepo] = useState("gitkraken-assessment");

  const getRepoIssues = async (owner : string, repo : string) => {
      // using the ipcRenderer.invoke method exposed in preload.cts
      const resp = await window.github.GetRepoIssues(owner, repo);
      console.log(resp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (owner && repo) getRepoIssues(owner, repo);
  };

  return (
    <>
      <div>
      </div>
      <h1>Simple GitHub Issues</h1>
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
      </div>
    </>
  )
}



export default App
