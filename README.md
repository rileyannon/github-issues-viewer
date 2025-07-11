# Getting Started
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
# Sources

** Supplemental Materials **
[Electron Course - Code Desktop Applications (inc. React and Typescript)](https://www.youtube.com/watch?v=fP-371MN0Ck) - This YouTube course from freeCodeCamp.org was absolutely invaluable for getting me started with Electron. This helped me set up the foundation of my application, which I then used as the canvas for the rest of my development cycle. 

[GitHub - REST API endpoints for issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues) - helped me set up the majority of my githubApi.ts service layer

[Electronjs.org - ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main) - setting up ipcMain
[Electronjs.org - ipcRenderer](https://www.electronjs.org/docs/latest/api/ipc-renderer) - setting up ipcRenderer

** Debugging Materials** 

[dotenv-examples](https://github.com/dotenv-org/examples/tree/master) - Getting environment variables was not as straightforward as I expected initially, especially compared to my work in "pure" React and Node.js. This repo from dotenv was incredibly helpful in getting it set up

[StackOverflow - TypeScript error: Property 'X' does not exist on type 'Window'](https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window)