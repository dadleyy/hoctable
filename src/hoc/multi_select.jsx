import ActionMenu from "./action_menu";

function DefaultButton({delegate}) {
  return (<a className="button">{delegate.text()}</a>);
}

function ItemFactory(Transclusion) {

  return function Item({delegate, option}) {
    let content = Transclusion ? (<Transclusion option={option} />) : null;

    function finished(item) {
    }

    function toggle() {
      return delegate.toggle(option, finished);
    }

    if(content)
      return (<div className="pointer option-list__option" onClick={toggle}>{content}</div>);

    return (
      <div className="pointer option-list__option clearfix">
        <div className="float-left margin-right-1">
          <input type="checkbox" checked={delegate.isSelected(option)} onChange={toggle} />
        </div>
        <div className="overflow-hidden">
          <p>{delegate.translate(option)}</p>
        </div>
      </div>
    );
  }

}

function MenuFactory(ButtonComponent = DefaultButton, ItemTransclusion) {
  const Item = ItemFactory(ItemTransclusion);

  function options(list_el) {
    let {delegate, close} = this.props;
    let {options} = this;

    if(!list_el)
      return;

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

        ReactDOM.render(<Item delegate={delegate} option={option} />, body);
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
