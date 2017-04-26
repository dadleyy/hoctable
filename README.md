## hoctable - delegate-driven high order components

---- 


| | |
| ---- | ---- |
| [![travis](https://travis-ci.org/dadleyy/hoctable.svg?branch=master)](https://travis-ci.org/dadleyy/hoctable) | [![codecov](https://codecov.io/gh/dadleyy/hoctable/branch/master/graph/badge.svg)](https://codecov.io/gh/dadleyy/hoctable) |
| [![release](https://img.shields.io/github/release/dadleyy/hoctable.svg)](https://github.com/dadleyy/hoctable) | [![npm version](https://badge.fury.io/js/hoctable.svg)](https://www.npmjs.com/package/hoctable) |
| [![devDependencies Status](https://david-dm.org/dadleyy/hoctable/dev-status.svg)](https://david-dm.org/dadleyy/hoctable?type=dev) | [![dependencies Status](https://david-dm.org/dadleyy/hoctable/status.svg)](https://david-dm.org/dadleyy/hoctable) |

----

### Delegate-driven High Order Components?

*[High Order Programming](https://en.wikipedia.org/wiki/Higher-order_programming)* is a style of programming that involves using "software components, like functions, modules or objects, as values." When combined with delegate interfaces like iOS's [`UITableViewDataSource`](https://developer.apple.com/reference/uikit/uitableviewdatasource) (which is used to load data into a table view), a pattern emerges for creating re-usable components.

### Contributing + Developing

Contributions to the library are very welcome - please fork the repository and open a PR with your changes into master.

To get the examples + library compiling locally:

```
$ git clone <your fork> ./hoctable
$ cd ./hoctable
$ npm i
$ npm run typings:install
$ npm run build:all
$ npm test
```

To see what happens when a new tag is created, check out the [`travis.yml`](https://github.com/dadleyy/hoctable/blob/master/.travis.yml) file.

### Learning + Documentation

For examples and api documentation:

* [Examples](https://github.com/dadleyy/hoctable/tree/master/example)
* [Unit Tests](https://github.com/dadleyy/hoctable/tree/master/test/unit/src)
* [Project Page](https://dadleyy.github.io/hoctable)
