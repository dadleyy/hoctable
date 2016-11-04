import ActionMenu from "./action_menu";

function DefaultButton({delegate}) {
  return (<a className="button">{delegate.text()}</a>);
}

function ItemFactory(Transclusion) {

  return function Item({delegate, option, signals}) {
    let content = Transclusion ? (<Transclusion option={option} />) : (<p>{delegate.translate(option)}</p>);

    function finished(item) {
      signals.selection(item);
    }

    function select() {
      return delegate.select(option, finished);
    }

    return (<div className="pointer option-list__option" onClick={select}>{content}</div>);
  }

}

function MenuFactory(ButtonComponent = DefaultButton, ItemTransclusion) {
  const Item = ItemFactory(ItemTransclusion);

  function options(list_el) {
    let {delegate, close} = this.props;
    let {options} = this;

    if(!list_el)
      return;

    let signals = {
      selection() { setTimeout(close); }
    };

    function render(option_list) {
      let {childNodes: children} = list_el;

      // cleanup previous tbody elements
      while(options.length) {
        let [next] = options.splice(0, 1);
        ReactDOM.unmountComponentAtNode(next);
        utils.dom.remove(next);
      }

      // see the hoc table
      for(let i = 0, c = option_list.length; i < c; i++) {
        let option = option_list[i];
        let body   = document.createElement("div");

        ReactDOM.render(<Item delegate={delegate} option={option} signals={signals} />, body);
        list_el.appendChild(body);
        options.push(body);
      }
    }

    delegate.options(render);
  }

  class Select extends React.Component {

    constructor(props) {
      super(props);
      this.options = [];
    }

    render() {
      return (<div className="option-list dropdown-pane menu" ref={options.bind(this)}></div>);
    }

  }

  return ActionMenu(ButtonComponent, Select);

}

export default MenuFactory;
