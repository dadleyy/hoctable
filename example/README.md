# Hoctable examples

This directory contains two single page applications that demonstrate the power of the [hoctable](https://github.com/dadleyy/hoctable) component library. Both of the applications are compiled by the npm scripts configured at the root of the respository.

### The `ghp` Example

This directory contains the source code for the application that is used as the [github pages](https://dadleyy.github.io/hoctable/)  project website.

```
$ npm run build:all
$ npm run build:ghp
$ npm install http-server
$ ROUTING_BASE="/" ./node_modules/http-server ./dist/gh-pages
```

### The `fullstack` Example

This directory contains source code for both a browser-side single page application and a mini [`expressjs`](https://expressjs.com/) json api.

```
$ npm run build:all
$ npm run example:server
```
