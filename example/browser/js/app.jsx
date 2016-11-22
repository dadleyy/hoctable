import {reducers, services} from "hoctable";

import FourOhFour from "./pages/missing";

import Products from "./routes/products/index";
import Paged from "./routes/people/paged";
import Basic from "./routes/people/basic";
import Issues from "./routes/issues";

function el(id) {
  return document.getElementById(id);
}

function route(handler) {
  function render(component) {
    ReactDOM.render(component, el("main"));
  }

  return function start(context) {
    handler(context).then(render);
  }
}

page("/issues/:org/:repo", route(Issues.Index));
page("/issues/:org/:repo/:number", route(Issues.Details));

page("/products", route(Products));
page("/people/paged", route(Paged));
page("/people", route(Basic));


page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

services.Popups.mount(el("popups"));
services.Viewport.bind();
page.start({popstate: true})
