import Delegate from "./services/delegate";

import People from "./pages/people";
import FourOhFour from "./pages/missing";

function el(id) {
  return document.getElementById(id);
}

page("/people", function() {
  let sorting = {rel: "id"};
  let delegate = new Delegate(sorting);
  ReactDOM.render(<People delegate={delegate} sorting={sorting} />, el("main"));
});

page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

page.start({popstate: true})
