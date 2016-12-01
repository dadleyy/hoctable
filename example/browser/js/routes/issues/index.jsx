import IndexPage from "../../pages/issues/index";
import Delegate from "../../services/delegates/issues/table";

function Index(context) {
  let {org, repo} = context.params;
  let delegate = new Delegate(org, repo);
  return Q.resolve(<IndexPage table={delegate} />);
}

export default Index;
