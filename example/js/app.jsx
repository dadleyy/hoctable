import Delegate from "./services/delegate";
import Table from "./components/table";

let sorting = {rel: "id"};
let delegate = new Delegate(sorting);

function el(id) {
  return document.getElementById(id);
}

ReactDOM.render(<Table delegate={delegate} sorting={sorting} />, el("main"));
