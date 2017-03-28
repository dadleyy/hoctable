import defer from "../services/defer";

const path = "/";
const view = "example/ghp/js/views/index";

function resolve() {
  return defer.resolve({});
}

export default {path, view, resolve};
