import defer from "../services/defer";
import * as ENV from "config/environment";

const { routing } = ENV;

const path = "*";
const view = "example/ghp/js/views/missing";

function resolve() {
  let url = `${routing.base_url}#!movies`;
  return defer.reject({ code: 300, url });
}

export default {path, view, resolve};
