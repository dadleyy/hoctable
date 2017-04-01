import ActionMenu from "hoctable/hoc/action_menu";
import { PopupCloseCallback } from "hoctable/hoc/action_menu";
import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface SelectCallback {
  () : void;
}

export interface OptionsCallback {
  (options : Array<any>) : void;
}

export interface SingleSelectDelegate {
  translate : (item : any) => string;
  select    : (item : any, callback : SelectCallback) => void;
  options   : (callback : OptionsCallback) => void
}

export interface ItemSignals {
  selection : () => void;
}

export interface SingleSelectProps {
  delegate : SingleSelectDelegate;
  close    : PopupCloseCallback;
}

export interface ItemProps<DelegateType> {
  option   : any;
  delegate : DelegateType;
  signals  : ItemSignals;
}

export type SingleSelectItemProps = ItemProps<SingleSelectDelegate>;
export type ItemComponent         = React.StatelessComponent<SingleSelectItemProps>;
export type ComposedSelect        = React.ComponentClass<SingleSelectProps>;

export const CLASSES = {
  SELECT         : "hoctable__select",
  SELECT_OPTION  : "hoctable__select-option",
  SELECT_LOADING : "hoctable__select-option--loading",
  SELECT_BUTTON  : "hoctable__select-toggle"
};

export function DefaultButton({delegate}) {
  return (<a className={CLASSES["SELECT_BUTTON"]}>{delegate.text()}</a>);
}

export function DefaultLoading() {
  return (<div className={CLASSES["SELECT_LOADING"]}><p>loading</p></div>);
}

function ItemFactory(Inner : ItemComponent) : ItemComponent {

  function Item(props : SingleSelectItemProps) {
    let {delegate, option, signals} = props;
    let content = Inner ? <Inner {...props} /> : (<p>{delegate.translate(option)}</p>);

    function finished() {
      signals.selection();
    }

    function select() {
      return delegate.select(option, finished);
    }

    return (<div className={CLASSES["SELECT_OPTION"]} onClick={select}>{content}</div>);
  }

  return Item;
}

function Factory(ItemType : ItemComponent, ButtonComponent = DefaultButton, Loading = DefaultLoading) : ComposedSelect {
  const Item = ItemFactory(ItemType);

  class Menu extends React.Component<SingleSelectProps, any> {
    private options : Array<HTMLElement>;
    private canceled : boolean;

    constructor(props) {
      super(props);
      this.options    = [];
      this.transclude = this.transclude.bind(this);
    }

    componentWillUnmount() {
      let { options } = this;

      // cleanup previous tbody elements
      while(options.length) {
        let [ next ] = options.splice(0, 1);

        if(!next) {
          continue;
        }

        ReactDOM.unmountComponentAtNode(next);
        utils.dom.remove(next);
      }

      this.canceled = true;
    }

    transclude(list_el : HTMLElement) {
      let { delegate, close } = this.props;
      let { options } = this;

      if(!list_el) {
        return;
      }

      let signals = {
        selection() { setTimeout(close); }
      };

      function render(option_list : Array<any>) {
        let { canceled } = this;
        let { childNodes: children } = list_el;

        // If the component was unmounted during an attempt to load options do nothing
        if(canceled) {
          return;
        }

        // Cleanup previous rendered options
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

      // If we did not previously have menu items, gracefully display a loading element.
      if(options.length === 0) {
        let body = document.createElement("div");
        ReactDOM.render(<Loading />, body);
        list_el.appendChild(body);
        options.push(body);
      }

      // Load in the delegate's options
      delegate.options(render.bind(this));
    }

    render() {
      return (<div className={CLASSES["SELECT"]} ref={this.transclude}></div>);
    }

  }

  // The select is really just a menu who's body is a little bit smarter.
  return ActionMenu<SingleSelectProps>(Menu, ButtonComponent);

}

export default Factory;
