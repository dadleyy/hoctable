import DetailsPage from "../../pages/issues/details";
import Delegate from "../../services/delegates/issues/comments_table";

function Details(context) {
  let {org, number, repo} = context.params;

  function success(__, {results: issue}) {
    let delegate = new Delegate(org, repo, number);
    return Q.resolve(<DetailsPage issue={issue} table={delegate} />);
  }

  return qwest.get(`/api/issues`, {org, repo, number}).then(success);
}

export default Details;
