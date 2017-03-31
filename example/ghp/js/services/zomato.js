import defer from "services/defer";

const ACCESS_TOKEN_HEADER = "user-key";

function send(url, params) {
  let { access_token } = this.credentials;

  function preflight(xhr) {
    xhr.setRequestHeader(ACCESS_TOKEN_HEADER, atob(access_token));
  }

  return qwest.get(url,  params, { cache: true }, preflight);
}

class Client {

  constructor(credentials) {
    this.credentials = credentials;
  }

  categories(params = { }) {
    let { access_token, api_base_url } = this.credentials;
    let url = `${api_base_url}/categories`;

    function success(xhr, result) {
      const { status } = xhr;

      if(status !== 200) {
        return defer.reject(new Error("invalid zomato response code"))
      }

      return result && result.categories ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    return send.call(this, url, params).then(success);
  }

  search(params = { }) {
    let { api_base_url } = this.credentials;
    let url = `${api_base_url}/search`;

    function success(xhr, result) {
      const { status } = xhr;

      if(status !== 200) {
        return defer.reject(new Error("invalid zomato response code"))
      }

      return result && result.restaurants ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    return send.call(this, url, params).then(success);
  }

}

export default Client;
