import i18n from "../../services/i18n";
import Markdown from "../markdown";
import Labels from "./label_list";
import Thumb from "./user_thumb";
import StateLabel from "./state_label";
import Table from "./comment_table";
import linkify from "../../services/github/linkify";
import * as React from "react";

function IssueDisplay({issue, delegate, store}) {
  return (
    <div className="clearfix issue-display">
      <div className="clearfix">
        <h4><span className="grey-text">#{issue.number}</span> {issue.title}</h4>
        <hr />
      </div>
      <div className="clearfix">
        <div className="float-right clearfix margin-left-1">
          <div className="clearfix padding-bottom-1">
            <h6><span>{i18n("reporter")}:</span></h6>
            <Thumb user={issue.user} />
          </div>
          <hr />
          <div className="clearfix padding-bottom-1">
            <h6><span>{i18n("status")}:</span></h6>
            <StateLabel state={issue.state} />
          </div>
        </div>
        <div className="overflow-hidden height-auto">
          <Markdown text={linkify(issue.body)} />
          <hr />
          <h1>{i18n("comments")}</h1>
          <div className="issue-display__comments">
            <Table delegate={delegate} store={store} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDisplay;
