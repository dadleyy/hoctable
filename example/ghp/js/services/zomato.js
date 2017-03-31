import defer from "services/defer";

const ACCESS_TOKEN_HEADER = "user-key";

class Client {

  constructor(credentials) {
    this.credentials = credentials;
  }

  search(params = { }) {
    let { access_token, api_base_url } = this.credentials;
    let url = `${api_base_url}/search`;

    function preflight(xhr) {
      xhr.setRequestHeader(ACCESS_TOKEN_HEADER, atob(access_token));
    }

    function success(xhr, result) {
      const { status } = xhr;

      if(status !== 200) {
        return defer.reject(new Error("invalid zomato response code"))
      }

      return result && result.restaurants ? defer.resolve(result) : defer.reject(new Error("invalid response"));
    }

    return qwest.get(url,  params, { cache: true }, preflight).then(success);
  }

}

export default Client;
