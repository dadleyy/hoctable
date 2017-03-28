import index from "./routes/index";
import missing from "./routes/missing";
import Footer from "./components/footer";

import router from "./router";

const { routing } = window.ENV;

function el(id) {
  return document.getElementById(id);
}

function start() {
  router.register(index);
  router.register(missing);

  router.start(routing && routing.baseUrl ? routing.baseUrl : "/hoctable/");
  ReactDOM.render(<Footer />, el("application-footer"));
}

export {start};
