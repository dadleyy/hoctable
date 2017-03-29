import Footer from "./components/footer";
import Header from "./components/header";
import router from "./router";

import * as ENV from "config/environment";
import index from "./routes/index";
import about from "./routes/about";
import missing from "./routes/missing";

const { routing } = ENV;

function el(id) {
  return document.getElementById(id);
}

function start() {
  router.register(index);
  router.register(about);
  router.register(missing);

  router.start(routing && routing.base_url ? routing.base_url : "/hoctable/");
  ReactDOM.render(<Header />, el("application-header"));
  ReactDOM.render(<Footer />, el("application-footer"));
}

export {start};
