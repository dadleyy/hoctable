import * as hoctable from "hoctable";
import Errored from "views/error";

// Example router
//
// Heavily inspired by angular's (v1.x) routing, this router expects the application to define routes in terms of a 
// path, a view module (string) and a resolution function. Once the application's url matches the path provided by the
// route, the router will call the route's `resolve` function, sending the pagejs route context into it. Upon 
// successful resolution, the router will `require` the route's view module, rendering it with the resolution data into
// the document's #main element.

function el(id) {
  return document.getElementById(id);
}

let state = { };

// @typedef {Object} Route
// @property {string} path - The url pattern that the router will match against.
// @property {function} resolve - A promise-returning function who's resolution will be sent into view initialization.
// @property {string} view - The module path who's export will be initialzed and rendered into the document.

const Router = {

  get active() {
    return state.active;
  },

  // @function register
  //
  // @param {Route} route - the route to register against pagejs internals
  register(route) {
    let { view, path, resolve } = route;
    let runtime = null;

    state.active = null;

    function render({default: View}) {
      let { resolution } = runtime;
      let instance = React.createElement(View, { resolution });
      state.active = { view, path };
      ReactDOM.render(instance, el("main"));
    }

    function load(resolution) {
      runtime = { resolution };

      // Lazy-load the route's view module & prepare to render
      require([view], render);
    }

    function failed({ code = 500, url }) {
      // Allow routes to reject w/ redirects.
      if(code === 300 && url) {
        return page(url);
      }

      ReactDOM.render(<Errored />, el("main"));
    }

    function begin(context) {
      resolve.call(context).then(load).catch(failed);
    }

    // Register our route entry with the pagejs internals.
    page(path, begin);
  },


  // @function start
  //
  // @param {string} base - The url base that the application will register with the pagejs api.
  start(base) {
    hoctable.services.Popups.mount(el("popups"));
    hoctable.services.Viewport.bind();

    page.base(base);

    // Hashbanging routing engine here for github page's lack of spa support.
    page.start({ hashbang: true });
  }

}

export default Router;
