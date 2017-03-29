# A quick note on examples

This directory contains two single page applications that demonstrate the power of the [hoctable](https://github.com/dadleyy/hoctable) component library. Both of the applications are compiled by the npm scripts configured at the root of the respository.

### The `ghp` Example

This directory contains the source code for the application that is used as the [github pages](https://dadleyy.github.io/hoctable/)  project website. The source code is compiled by the [typescript](https://www.typescriptlang.org/) compiler into a single file via the [`build:ghp:js`](https://github.com/dadleyy/hoctable/blob/c9186c7/package.json#L35) npm script. During runtime, the application is uses a [pagejs](https://visionmedia.github.io/page.js/) routing engine that supports an angular-like routing engine which defines routes in terms of a `view`, `path` and `resolve` function. 

| | |
| ---- | ---- |
| compiler | [typescript](https://www.typescriptlang.org/) |
| routing | [pagejs](https://visionmedia.github.io/page.js/) |
| backend | none |

```
$ npm run build:all
$ npm run build:ghp
$ npm install http-server
$ ROUTING_BASE="/" ./node_modules/http-server ./dist/gh-pages
```

### The `fullstack` Example

This directory contains source code for both a browser-side single page application and a mini [`expressjs`](https://expressjs.com/) json api. Unlike the github pages example, this application is compiled using webpack which is used to compile and serve the browser-side code as well as proxy requests to the nodejs server.

| | |
| ---- | ---- |
| compiler | [webpack](https://webpack.js.org/) |
| routing | [pagejs](https://visionmedia.github.io/page.js/) |
| backend | [expressjs](https://expressjs.com/) |

```
$ npm run build:all
$ npm run example:server
```
