import index from "./routes/index";
import missing from "./routes/missing";

import router from "./router";

const { routing } = window.ENV;

function start() {
  router.register(index);
  router.register(missing);
  router.start(routing && routing.baseUrl ? routing.baseUrl : "/hoctable/");
}

export {start};
