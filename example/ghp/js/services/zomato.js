import defer from "services/defer";

const ACCESS_TOKEN_HEADER = "user-key";

function send(url, params) {
  let { access_token } = this.credentials;

  function preflight(xhr) {
    xhr.setRequestHeader(ACCESS_TOKEN_HEADER, atob(access_token));
  }

  function status(xhr, result) {
    const { status: code } = xhr;
    return code !== 200 ? defer.reject(result) : defer.resolve(result);
  }

  return qwest.get(url,  params, { cache: true }, preflight).then(status);
}

class Client {

  constructor(credentials) {
    this.credentials = credentials;
  }

  cuisines(city_id, query, extra = { }) {
    const { api_base_url } = this.credentials;
    const url = `${api_base_url}/cuisines`;

    function success(result) {
      let { cuisines } = result;
      return cuisines ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    const params = { q: query, city_id, ...extra };
    return send.call(this, url, params).then(success);
  }

  cities(query) {
    const { api_base_url } = this.credentials;
    const url = `${api_base_url}/cities`;

    function success(result) {
      let { location_suggestions } = result;
      return location_suggestions ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    const params = { q: query };
    return send.call(this, url, params).then(success);
  }

  categories(params = { }) {
    let { access_token, api_base_url } = this.credentials;
    let url = `${api_base_url}/categories`;

    function success(result) {
      return result && result.categories ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    return send.call(this, url, params).then(success);
  }

  search(params = { }) {
    let { api_base_url } = this.credentials;
    let url = `${api_base_url}/search`;

    function success(result) {
      return result && result.restaurants ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    return send.call(this, url, params).then(success);
  }

}

export default Client;
