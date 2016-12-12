## hoctable - delegate-driven high order components

[![travis](https://travis-ci.org/dadleyy/hoctable.svg?branch=master)](https://travis-ci.org/dadleyy/hoctable) [![release](https://img.shields.io/github/release/dadleyy/hoctable.svg)](https://github.com/dadleyy/hoctable) [![npm version](https://badge.fury.io/js/hoctable.svg)](https://badge.fury.io/js/hoctable)

----

### Delegate-driven High Order Components?

*[High Order Programming](https://en.wikipedia.org/wiki/Higher-order_programming)* is a style of programming that involves using "software components, like functions, modules or objects, as values." When combined with delegate interfaces like iOS's [`UITableViewDataSource`](https://developer.apple.com/reference/uikit/uitableviewdatasource) (which is used to load data into a table view), a pattern emerges for creating re-usable components.

### Installing

One of the goals of this project is to ease the [headache](https://medium.com/@trek/last-week-i-had-a-small-meltdown-on-twitter-about-npms-future-plans-around-front-end-packaging-b424dd8d367a) of browser-side dependency/package management and module/language implementations by providing multiple distributions that can be consumed by different package managers.

##### via [npm](https://www.npmjs.com):

When installing the hoctable library through npm, you will receive both a copy of the source code, as well as a complete build distribution, which includes targets for:

* es5 (amd)
* es5 (umd)
* es6

Also included is as a typings directory with ambient module declarations for consumers using typescript.


```
$ npm install hoctable --save
```

##### via [bower](http://bower.io/) (*recommended*):

Rather than installing the package with npm, bower allows consumers to pick and choose the distributable themselves by providing the manager with one of the github release tarballs that are published [here](https://github.com/dadleyy/hoctable/releases).

```
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.all.tar.gz
# or
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.es5.tar.gz
# or
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.es5-bundle.tar.gz
# or
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.es6.tar.gz
# or
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.umd.tar.gz
# or
$ bower i https://github.com/dadleyy/hoctable/releases/download/7.1.0/hoctable.typings.tar.gz
```

For more specific instructions on using this library with your codebase, see the [project page](https://dadleyy.github.io/hoctable).

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

#### A note about versions

During the early phases of this project, there were a signifant amount of volitile changes to the contents/structure of the distributable package. The earliest "stable" version of this library is `8.0.0`.
