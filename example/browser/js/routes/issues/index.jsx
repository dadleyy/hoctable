import IndexPage from "../../pages/issues/index";
import Delegate from "../../services/delegates/issues/table";
import FilterDelegate from "../../services/delegates/issues/filters";

function Index(context) {
  let {org, repo} = context.params;
  let filters = new FilterDelegate();
  let delegate = new Delegate(org, repo, filters);

  return Q.resolve(<IndexPage table-delegate={delegate} filters={filters} />);
}

export default Index;
