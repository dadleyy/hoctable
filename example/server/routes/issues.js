const github = require("../services/github");
const defer  = require("../services/defer");

module.exports.index = function find(req, res) {
  let {org, repo, page, max, since, number} = req.query;

  function success([results, repo]) {
    let {open_issues: total} = repo;
    return res.json({meta: {total}, status: "SUCCESS", results});
  }

  function failed(err) {
    return res.json({meta: {}, status: "FAILED", errors: [err]});
  }

  let filtered = number && /^[0-9]+$/.test(number) === true;
  let lookup   = filtered ? github.issue(org, repo, number) : github.issues(org, repo, page, max, since);

  defer.all([lookup, github.repo(org, repo)]).then(success).catch(failed);
};

module.exports.comments = function details(req, res) {
  let {org, repo, issue, number, page, max, since} = req.query;

  function success([results, issue]) {
    let {comments: total} = issue;
    return res.json({meta: {total}, results: results, status: "SUCCESS"});
  }

  function failed() {
    return res.json({meta: {}, results: [], status: "FAILED"});
  }

  let id = issue || number;

  defer.all([
    github.comments(id, org, repo, page, max),
    github.issue(org, repo, id) 
  ]).then(success).catch(failed);
};
