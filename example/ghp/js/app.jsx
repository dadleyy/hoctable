import index from "./routes/index";
import missing from "./routes/missing";

import router from "./router";

function start() {
  router.register(index);
  router.register(missing);
  router.start();
}

export {start};
