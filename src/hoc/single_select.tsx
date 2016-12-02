import ActionMenu from "hoc/action_menu";
import {PopupCloseCallback} from "hoc/action_menu";
import utils from "utils";

export declare interface SelectCallback {
  () : void;
}

export declare interface OptionsCallback {
  (options : Array<any>) : void;
}

export declare interface SingleSelectDelegate {
  translate : (item : any) => string;
  select    : (item : any, callback : SelectCallback) => void;
  options   : (callback : OptionsCallback) => void
}

export declare interface ItemSignals {
  selection : () => void;
}

export declare interface SingleSelectProps {
  delegate : SingleSelectDelegate;
  close    : PopupCloseCallback;
}

export declare interface ItemProps {
  option   : any;
  delegate : SingleSelectDelegate;
  signals  : ItemSignals;
}

type ComposedItem = React.StatelessComponent<ItemProps>;

function DefaultButton({delegate}) {
  return (<a className="button">{delegate.text()}</a>);
}


function ItemFactory(Transclusion : React.Component<ItemProps, any>) : ComposedItem {

  return function Item({delegate, option, signals}) {
    let content = Transclusion ? null : (<p>{delegate.translate(option)}</p>);

    function finished() {
      signals.selection();
    }

    function select() {
      return delegate.select(option, finished);
    }

    return (<div className="pointer option-list__option" onClick={select}>{content}</div>);
  }

}

function Factory(ItemTransclusion, ButtonComponent = DefaultButton) {
  const Item = ItemFactory(ItemTransclusion);

  class Menu extends React.Component<SingleSelectProps, any> {
    private options : Array<any>;

    constructor(props) {
      super(props);
      this.options    = [];
      this.transclude = this.transclude.bind(this);
    }

    transclude(list_el : HTMLElement) {
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

    render() {
      return (<div className="option-list dropdown-pane menu" ref={this.transclude}></div>);
    }

  }

  return ActionMenu(Menu, ButtonComponent);

}

export default Factory;
