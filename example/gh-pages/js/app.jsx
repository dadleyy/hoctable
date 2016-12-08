import index from "./routes/index";
import router from "./router";

function start() {
  router.register(index);
  router.start();
}

export {start};
