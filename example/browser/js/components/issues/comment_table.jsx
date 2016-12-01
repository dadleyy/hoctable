import {services, hoc} from "hoctable";
import i18n from "../../services/i18n";
import linkify from "../../services/github/linkify";
import Thumb from "./user_thumb";
import Markdown from "../markdown";
import Labels from "./label_list";

function Empty() {
  return (
    <tr className="comment-row comment-row--empty">
      <td colSpan="1">{i18n("no_results")}</td>
    </tr>
  );
}

function Error() {
  return (
    <tr className="comment-row comment-row--errored">
      <td colSpan="1">{i18n("something_went_wrong")}</td>
    </tr>
  );
}

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {row} = this.props;
    let {comment, org, repo} = row;

    if(row.error === true)
      return <Error />;

    if(row.empty === true)
      return <Empty />;

    return (
      <tr className="comment-row">
        <td className="comment-row__cell">
          <div className="cleafix comment-row__author-date">
            <Thumb user={comment.user} />
          </div>
          <div className="clearfix comment-row__content body">
            <Markdown text={linkify(comment.body)} />
          </div>
        </td>
      </tr>
    );
  }

}

export default hoc.Table(Row);

