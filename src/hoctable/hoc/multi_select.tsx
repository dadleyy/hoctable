import {ItemSignals, ItemProps} from "hoctable/hoc/select";
import {PopupCloseCallback} from "hoctable/hoc/action_menu";
import utils from "hoctable/utils";


export interface OptionsCallback {
  (results : Array<any>) : void;
}

export interface ToggledCallback {
  () : void;
}

export interface MultiSelectDelegate {
  options    : (callback : OptionsCallback) => void;
  toggle     : (item : any, callback : ToggledCallback) => void;
  translate? : (item : any) => string;
}

export interface MultiSelectProps {
  delegate : MultiSelectDelegate;
  close    : PopupCloseCallback;
}

export type MultiSelectItemProps = ItemProps<MultiSelectDelegate>;
export type ComposedItem = React.ComponentClass<MultiSelectItemProps>;
export type ComposedSelect = React.ComponentClass<MultiSelectProps>;

function ItemFactory(Inner : React.ComponentClass<MultiSelectItemProps>) : ComposedItem {

  class Item extends React.Component<MultiSelectItemProps, any> {

    render() {
      let {props} = this;
      let {delegate, option, signals} = props;
      let content = Inner ? <Inner {...props} /> : (<p>{delegate.translate(option)}</p>);

      function finished() {
        signals.selection();
      }

      function select() {
        return delegate.toggle(option, finished);
      }

      return (<div className="pointer option-list__option" onClick={select}>{content}</div>);
    }

  }

  return Item;

}

function Factory(ItemT : React.ComponentClass<MultiSelectItemProps>) : ComposedSelect {
  const Item = ItemFactory(ItemT);

  class MultiSelect extends React.Component<MultiSelectProps, any> {
    private options : Array<HTMLElement>;

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

  return MultiSelect;

}

export default Factory;
