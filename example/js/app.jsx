import Delegate from "./services/delegate";
import Table from "./components/table";

let sorting = {rel: "id"};
let delegate = new Delegate(sorting);

function el(id) {
  return document.getElementById(id);
}

page("/people", function() {
  ReactDOM.render(<Table delegate={delegate} sorting={sorting} />, el("main"));
});

page("*", function() {
  return page("/people");
});

page.start({popstate: true})
