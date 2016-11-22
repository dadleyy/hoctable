const USERNAME_RE = /\s@([A-Za-z0-9_-]+)\s/i;

function replace(___, group) {
  return ` [@${group}](https://github.com/${group}) `;
}

function linkify(body) {
  return body.replace(USERNAME_RE, replace);
}

export default linkify;
