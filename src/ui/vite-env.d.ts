/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    github: {
      GetRepoIssues: (owner: string, repo: string) => Promise<any>;
    };
  }
}