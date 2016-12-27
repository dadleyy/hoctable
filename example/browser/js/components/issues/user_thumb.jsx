import * as React from "react";

function Thumb({user}) {
  let image_style = {backgroundImage: `url(${user.avatar_url})`};

  return (
    <div className="issue-user-thumb clearfix">
      <div className="display-table">
        <div className="display-table-cell v-align-middle">
          <div className="issue-user-thumb__avatar-image" style={image_style} />
        </div>
        <div className="display-table-cell v-align-middle padding-left-1">
          <p><a href={user.html_url}>@{user.login}</a></p>
        </div>
      </div>
    </div>
  );
}

export default Thumb;
