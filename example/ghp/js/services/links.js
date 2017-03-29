import * as ENV from "config/environment";

function to(path) {
  const { base_url: base } = ENV.routing || { };
  return base ? `${base}${path}` : path;
}

export default to;
