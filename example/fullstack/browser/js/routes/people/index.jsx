import Paged from "../../pages/people";
import PagedDelegate from "../../services/delegates/people/paged";
import * as React from "react";

function Route() {
  let delegate = new PagedDelegate();
  return Q.resolve(<Paged delegate={delegate} />);
}

export default Route;

