import {services} from "hoctable";

import Products from "./routes/products/index";
import Paged from "./routes/people/index";
import Issues from "./routes/issues";
import FourOhFour from "./pages/missing";

function el(id) {
  return document.getElementById(id);
}

function route(handler) {
  function render(component) {
    ReactDOM.render(component, el("main"));
  }

  function failed(err) {
    console.error(err.stack);
  }

  return function start(context) {
    handler(context).then(render).catch(failed);
  }
}

page("/issues/:org/:repo", route(Issues.Index));
page("/issues/:org/:repo/:number", route(Issues.Details));

page("/products", route(Products));
page("/people", route(Paged));


page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

services.Popups.mount(el("popups"));
services.Viewport.bind();
page.start({popstate: true})
