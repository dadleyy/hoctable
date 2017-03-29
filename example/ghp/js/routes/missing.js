import defer from "../services/defer";

const path = "*";
const view = "example/ghp/js/views/missing";


function resolve() {
  return defer.reject({ code: 300, url: '/' });
}

export default {path, view, resolve};
