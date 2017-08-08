import MenuFactory, { PopupCloseCallback } from "hoctable/hoc/menu";
import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface SelectionFlags {
  remain_open : boolean;
}

export type SelectCallback = (remain_open? : SelectionFlags) => void;
export type OptionsCallback = (options : Array<any>) => void;

export interface SingleSelectDelegate {
  translate : (item : any) => string;
  select    : (item : any, callback : SelectCallback) => void;
  options   : (callback : OptionsCallback) => void;
}

export interface ItemSignals {
  selection : (remain_open : boolean) => void;
}

export interface SingleSelectProps {
  delegate : SingleSelectDelegate;
  close    : PopupCloseCallback;
  redraw   : PopupCloseCallback;
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
  SELECT                  : "hoctable__select",
  SELECT_OPTION           : "hoctable__select-option",
  SELECT_LOADING          : "hoctable__select-option--loading",
  SELECT_OPTION_CONTAINER : "hoctable__select-option--container",
  SELECT_BUTTON           : "hoctable__select-toggle"
};

export function DefaultButton({delegate}) : React.ReactElement<any> {
  return (<a className={CLASSES["SELECT_BUTTON"]}>{delegate.text()}</a>);
}

export function DefaultLoading() : React.ReactElement<any> {
  return (<div className={CLASSES["SELECT_LOADING"]}><p>loading</p></div>);
}

function ItemFactory(Inner : ItemComponent) : ItemComponent {

  function Item(props : SingleSelectItemProps) : React.ReactElement<any> {
    const { delegate, option, signals } = props;
    const content = Inner ? <Inner {...props} /> : (<p>{delegate.translate(option)}</p>);

    function finished(flags? : SelectionFlags) : void {
      signals.selection(flags && flags.remain_open === true);
    }

    function select() : void {
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
    private render_request : string;

    constructor(props) {
      super(props);
      this.options    = [];
      this.transclude = this.transclude.bind(this);
    }

    componentWillUnmount() : void {
      const { options } = this;

      // Cleanup previously rendered items.
      while(options.length) {
        const [ next ] = options.splice(0, 1);
        ReactDOM.unmountComponentAtNode(next);
        utils.dom.remove(next);
      }

      this.render_request = null;
    }

    transclude(list_el : HTMLElement) : void {
      const { delegate, close, redraw } = this.props;
      const { options } = this;

      if(!list_el) {
        return;
      }

      const selection = (remain_open : boolean) : void => {
        this.setState({ updated: Date.now() });

        return remain_open ? redraw() : close();
      };

      const signals = { selection };
      const current_request = this.render_request = utils.uuid();

      const render = (option_list : Array<any>) : void => {
        const { render_request } = this;

        // If the component was unmounted during an attempt to load options do nothing
        if(render_request !== current_request) {
          return;
        }

        // Cleanup previous rendered options
        while(options.length) {
          const [next] = options.splice(0, 1);
          ReactDOM.unmountComponentAtNode(next);
          utils.dom.remove(next);
        }

        // Iterate over the items provided by the delegate, rendering them.
        for(let i = 0, c = option_list.length; i < c; i++) {
          const option = option_list[i];
          const body   = utils.dom.create("div", null, [CLASSES["SELECT_OPTION_CONTAINER"]]);

          ReactDOM.render(<Item delegate={delegate} option={option} signals={signals} />, body);
          list_el.appendChild(body);
          options.push(body);
        }
      };

      // If we did not previously have menu items, gracefully display a loading element.
      if(options.length === 0) {
        const body = document.createElement("div");
        ReactDOM.render(<Loading />, body);
        list_el.appendChild(body);
        options.push(body);
      }

      delegate.options(render.bind(this));
    }

    render() : React.ReactElement<any> {
      const transclude = this.transclude.bind(this);

      return (<div className={CLASSES["SELECT"]} ref={transclude}></div>);
    }

  }

  // The select is really just a menu who's body is a little bit smarter.
  return MenuFactory<SingleSelectProps>(Menu, ButtonComponent);

}

export default Factory;
