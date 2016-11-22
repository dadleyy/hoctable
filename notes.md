# Notes

### Background

Instead of starting from scratch, I've built my solution to the excersise as one of the examples in an open source project I am working on; [hoctable](https://github.com/dadleyy/hoctable). The code for the github issues code exercise is on the [issues](https://github.com/dadleyy/hoctable/tree/issues) branch. At little background on the project - at my job we are using Backbone, but my past has been primarily defined by work with angular. Backbone is much less "equipped" out of the box for component development than angular is, so I decided to start playing around with react to see if it would be an easy transition for our architecture.

After having played with it for a bit, I started to really enjoy working with JSX and began following some of the [awesome](https://github.com/sindresorhus/awesome) lists for react development. In one of them I came across a block post which introduced [high order components](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) to me. Interestingly enough, because Backbone is so "bare bones", it is very straightforward to implement these types of components.

After about 3 more months, I had developed high order components for our company's application in the form of tables, menus, multi selects, searchable inputs, savable inputs, etc... The key was to allow consumers of the component to provide the "inner components" (transclusions), during _composition_ and then a delegate during _initialization_; kinda akin to c++ metaprogramming with templates. The delegate's interface would provide all of the core functionality that the component needs in order to know how to render the "transclusions". In the case of a table, the delegate would need to tell the instance of the composed compoent what rows to render. In the case of a single select - what options to display. This is a pattern I've "borrowed" from objective-c's [`UITableViewDataSource`](https://developer.apple.com/reference/uikit/uitableviewdatasource) interface.

Having been so successful at implementing it in backbone, I really wanted to see if I could apply the "delegate-driven high order component" philosophy in react. In [August](https://github.com/dadleyy/hoctable/commit/23ca652666a11395b6582bacf87453f977670870) I created this repository with the goal of creating a libary of these components implemented in React. Since then, I've been apply to implement paginated table, action menu, and single/mutli select components, and have even started using them in my own personal projects to tremendous success.

One of the most important benefits of this pattern is that the data source for the view is completely decoupled from the view itself. This means that all the business logic required to load in rows for a table can be isolated from the view itself, making the interface that loads in the rows extremely testable. This is extremely important when the UI needs to be "smart" about whether or not to display a particular item to a user; e.g the user is on a blocklist, the item has already been added to seomthing, etc... 

Another huge gain is that the data can be loaded asynchronously. This means that (with an api capable of filtering, sorting + paginating) the UI can focus only on asking for the information it needs to display, rather than attempting to figure that out itself. This decreases the total amount of data needed by the browser dramatically and ultimately results in much fewer bugs (e.g sorting dates in mysql vs javascript).

### The solution

As I mentioned earlier, the entirety of the exercise has been completed as part of the example application I've prepared for the hoctable library. Because the intent of the repository itself is indeed to serve as a library of components, there are two important source code directories:
 
* [`./example`](https://github.com/dadleyy/hoctable/tree/issues/example) Contains the code necessary to run examples deomonstrating the power of hoc. Underneath this directory, you will find:
  * [`./server`](https://github.com/dadleyy/hoctable/tree/issues/example/server) A dummy express js application with some fake data + a facade over the github api.
  * [`./browser`](https://github.com/dadleyy/hoctable/tree/issues/example/browser) The browser side application which uses components from the hoctable library.
* [`./src`](https://github.com/dadleyy/hoctable/tree/issues/src) This where the actual source code for the components lives

The routes I've prepared for this coding challenge can be found under the [`example/browser/js/routes`](https://github.com/dadleyy/hoctable/tree/issues/example/browser/js/routes/issues), directory which contains the route source code for the example browser application - the remainter of the source code for the browser application can be found in [`example/browser`](https://github.com/dadleyy/hoctable/tree/issues/example/browser).

#### Building + Running

Because the main purpose of this repository is to serve as a library rather than a stand-alone application, I chose to use [webpack](https://webpack.github.io) to compile the application, so having node installed is a must. One of the benefits about using webpack is that it provides the ability to spin up a "development" server which is what is actually used to serve the assets in the example directory I linked above. The configuration for that dev server can be found in the [`webpack.examples.conf.js`](https://github.com/dadleyy/hoctable/blob/issues/webpack.examples.config.js#L36-L37) which contains nodejs route handlers for comments/issues that essentially proxy to the github api. These endpoints are consumed by the [table delegate](https://github.com/dadleyy/hoctable/tree/issues/example/browser/js/services/delegates/issues) to load in row data for rendering.

To run the appliation, I have prepared [npm scripts](https://github.com/dadleyy/hoctable/blob/issues/package.json#L6-L13) that should be convenient and easy to run. After having cloned the repository **and checked-out `issues` branch**, you can run:

```
$ npm run build:debug
$ npm run example
```

**note: I wrote the dummy expressjs application using modern es6 syntax so I recommend using node v6.5.0 or above.**

The first command will compile the [source code](https://github.com/dadleyy/hoctable/tree/issues/src) and the second command will spin up the example dev server. By default it serves from [0.0.0.0:8080](http://0.0.0.0:8080/). After having successfully done so, you should see:

![image](https://cloud.githubusercontent.com/assets/1545348/20538705/4f9620d2-b0c0-11e6-9dde-329434d1a9c5.png)

The solution for the exercise can be accessed by clicking the "github example" link, where you should see:

![image](https://cloud.githubusercontent.com/assets/1545348/20538680/3c6a1e50-b0c0-11e6-8458-8ba8ae10f6c6.png)

While playing around with the solution, I recommend keeping the network tab open in dev tools which will allow you to see how the data is actually being filtered.
