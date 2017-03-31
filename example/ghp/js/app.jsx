import Footer from "components/footer";
import Header from "components/header";
import router from "router";

import * as ENV from "config/environment";

import movies from "routes/movies";
import about from "routes/about";
import restaurants from "routes/restaurants";
import missing from "routes/missing";

const { routing } = ENV;

function el(id) {
  return document.getElementById(id);
}

function start() {
  router.register(about);
  router.register(movies);
  router.register(restaurants);
  router.register(missing);
  router.start(routing && routing.base_url);
  ReactDOM.render(<Header />, el("application-header"));
  ReactDOM.render(<Footer />, el("application-footer"));
}

export {start};
