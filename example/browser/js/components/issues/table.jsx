import {hoc} from "hoctable";
import i18n from "../../services/i18n";
import Thumb from "./user_thumb";
import Labels from "./label_list";
import * as React from "react";

function Error() {
  return (
    <tr className="issue-row">
      <td colSpan="5">{i18n("something_went_wrong")}</td>
    </tr>
  );
}

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {row} = this.props;
    let {issue, org, repo} = row;

    if(row.error === true)
      return <Error />;

    let issue_url = `/issues/${org}/${repo}/${issue.number}`;

    return (
      <tr className="issue-row">
        <td className="issue-row__id">
          <p><a href={issue_url}>{issue.number}</a> (<a href={issue.html_url}>{i18n("github")}</a>)</p>
        </td>
        <td className="issue-row__title">
          <p>{issue.title}</p>
        </td>
        <td className="issue-row__labels">
          <Labels labels={issue.labels} />
        </td>
        <td className="issue-row__reporter">
          <Thumb user={issue.user} />
        </td>
        <td className="issue-row__state">
          <p>{issue.state}</p>
        </td>
      </tr>
    );
  }

}

export default hoc.Table(Row);

