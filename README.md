# About This Project

A cross-platform GitHub Issues Viewer built with React and Electron. Authenticate with a GitHub PAT and browse open issues with pagination support.

# Getting Started
Before all else, make sure you get all dependencies via npm:
```
npm install
```

To run in development mode (**recommended**):
```
npm run dev 
```

To run as an React Web App:
```
npm run dev:react 
```

To run as an Electron Desktop App:
```
npm run dev:electron 
```

To package the Electron app into an executable for distribution:
```
npm run dist:win      # For Windows - make sure you run as Admin when building
npm run dist:linux    # For Linux
npm run dist:mac      # For Mac
```
If the build seems to hang at any point, check your /dist directory as it may have built regardless.

# Behind the Design

One of the goals I had with designing this project was to familiarize myself with the Electron framework. While I was able to refer to a lot of great resources (as you can see in the Sources), quite a bit of the design was based on the structure of the tutorials I was following to get it initialized, specifically referring to the preload.cts and pathResolver.ts. 

Once I got these foundational aspects done, a lot of it closely mirrored the MVC patterns I am already quite familiar with. I tried to keep all functions related to the view within App.tsx, created a main model to build the issues off of in Issue.tsx, and kept all of my controller-adjacent functions within the /electron directory (IPC, preload, etc.). 

# What I Wish I Could Have Done

Some particular features I wish I would have had the time to implement include:
- In lieu of passing in a PAT to run from the frontend, would have loved to get dotenv working to use environment variables. It is not as straightforward as it is in Python, so I had to make some concessions to keep this as concise as I could.
- Setting the number of items per page from the frontend, in lieu of setting it to 25 issues per page by default.
- Localizing the Created At / Updated At datetimes. 
- Disabling the button when the required inputs are not filled in - that being said, we do handle for errors quite well under the circumstances so this one is not as big of an issue to me.
- The sorting of issues is backwards on the page - it loads the newest (25) issues first, but they show from newest on the top and oldest on the bottom. This is another concession I made to keep the development going.
- Better design. I kept it barebones, but would have loved the opportunity to extend these into more components than the ones we used. On top of that, would have loved to work more on the table.
- Better structure overall. While I do have experience with React in my own personal career, I have spent the majority of my time building off of already designed web applications so it was interesting for me to start out from scratch on this. If I had more time, I would have loved to better set up the file structure for this.
- An app icon would have been great.

# Sources

One of the main goals I had in doing this project was to avoid using AI and to fully challenge myself to grasp the material without relying on it. As such, I ended up using quite a few resources to help me accomplish my goal:

**Supplemental Materials**

These materials were used to help build the foundational knowledge needed to accomplish the tasks given to me.

[Electron Course - Code Desktop Applications (inc. React and Typescript)](https://www.youtube.com/watch?v=fP-371MN0Ck) - This YouTube course from freeCodeCamp.org was absolutely invaluable for getting me started with Electron. This helped me set up the foundation of my application, which I then used as the canvas for the rest of my development cycle. 

[GitHub - REST API endpoints for issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues) - helped me set up the majority of my githubApi.ts service layer

[GitHub - Using pagination in the REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28)

[GitHub - Octokit pagination](https://github.com/octokit/octokit.js#pagination) - Used to learn how to use iterator with pagination

[React.memo Documentation](https://react.dev/reference/react/memo)

[Electronjs.org - ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main) - setting up ipcMain

[Electronjs.org - ipcRenderer](https://www.electronjs.org/docs/latest/api/ipc-renderer) - setting up ipcRenderer

**Debugging Materials** 

These were used to debug specific issues.

[dotenv-examples](https://github.com/dotenv-org/examples/tree/master) - Getting environment variables was not as straightforward as I expected initially, especially compared to my work in "pure" React and Node.js. This repo from dotenv was incredibly helpful in getting it set up

[StackOverflow - TypeScript error: Property 'X' does not exist on type 'Window'](https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window)

[How To Add An SVG To A React App](https://www.youtube.com/watch?v=ZEoM_Ap6ks8) - Haven't had to do much SVG importing, and this was just a super cool approach to it!