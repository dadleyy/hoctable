import * as hoctable from "hoctable";


function el(id) {
  return document.getElementById(id);
}

function register(route) {
  let {view, path, resolve} = route;
  let runtime = null;

  function render({default: View}) {
    let {resolution} = runtime;
    let instance = React.createElement(View, {resolution});
    ReactDOM.render(instance, el("main"));
  }

  function load(resolution) {
    runtime = {resolution};
    require([view], render);
  }

  function begin(context) {
    resolve.call(context).then(load);
  }

  page(path, begin);
}

function start(base) {
  hoctable.services.Popups.mount(el("popups"));
  hoctable.services.Viewport.bind();
  page.base(base);
  page.start({hashbang: true});
}

export default {register, start};
