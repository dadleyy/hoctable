const USERNAME_RE = /\B@([a-zA-Z0-9_]+)/i;

function replace(full, group) {
  return `[@${group}](https://github.com/${group})`;
}

function linkify(body) {
  return body.replace(USERNAME_RE, replace);
}

export default linkify;
