import defer from "../services/defer";
import * as env from "config/environment";

const path = "about";
const view = "example/ghp/js/views/about";

function resolve() {
  let { space_id, access_token, api_base_url } = env.contentful || { };

  if(!space_id || !access_token) {
    return defer.reject(new Error("invalid contentful configuration"));
  }

  function loaded(xhr, data) {
    let json = JSON.parse(data);
    let [ content ] = json.items;
    return defer.resolve({ content });
  }

  function failed(e) {
    console.error(e);
    return defer.reject(e);
  }

  let content_type = 'aboutPage';
  let request = qwest.get(`${api_base_url}/spaces/${space_id}/entries`, { content_type, access_token })

  return request.then(loaded).catch(failed);
}

export default { path, view, resolve };
