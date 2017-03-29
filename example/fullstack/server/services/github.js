const request = require("request");
const defer = require("./defer");

const GITHUB     = "https://api.github.com";
const USER_AGENT = "User-Agent";

function fetch(url, qs = {}) {
  let {promise, resolve, reject} = defer();
  let headers = {[USER_AGENT]: "hoctable"};
  let token   = process.env["GITHUB_AUTH_TOKEN"];

  if(token)
    qs.access_token = token;

  function receive(err, response, body) {
    if(err || response.statusCode !== 200) {
      console.error(`received: ${body}`);
      return reject(new Error("INVALID_GITHUB_RESPONSE"));
    }

    try {
      let issues = JSON.parse(body);
      return resolve(issues);
    } catch(e) {
      reject(e);
    }
  }

  request.get(url, {headers, qs}, receive);

  return promise;
}


module.exports.repo = function(org, repo) {
  let url = `${GITHUB}/repos/${org}/${repo}`;
  return fetch(url);
};

module.exports.issue = function(org, repo, number) {
  let url   = `${GITHUB}/repos/${org}/${repo}/issues/${number}`;
  return fetch(url);
}

module.exports.comments = function(issue, org, repo, page = 0, max = 25) {
  let url = `${GITHUB}/repos/${org}/${repo}/issues/${issue}/comments`;
  let query = {page, per_page: max};
  return fetch(url, query);
}

module.exports.issues = function(org, repo, page = 0, max = 25, since = null, filters = {}) {
  let url   = `${GITHUB}/repos/${org}/${repo}/issues`;
  let query = {page, per_page: max};

  if(since)
    query.since = since;

  query.state = filters.closed ? "closed" : "open";

  return fetch(url, query);
}
