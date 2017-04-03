import ActionMenu from "hoctable/hoc/action_menu";
import { ItemSignals, ItemProps, DefaultButton } from "hoctable/hoc/select";
import { PopupCloseCallback } from "hoctable/hoc/action_menu";
import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export type OptionsCallback = (results : Array<any>) => void;
export type ToggledCallback = () => void;

export interface MultiSelectDelegate {
  options    : (callback : OptionsCallback) => void;
  toggle     : (item : any, callback : ToggledCallback) => void;
  translate? : (item : any) => string;
  isSelected : (item : any) => boolean;
}

export interface MultiSelectProps {
  delegate : MultiSelectDelegate;
  close    : PopupCloseCallback;
}

export type MultiSelectItemProps = ItemProps<MultiSelectDelegate>;
export type ItemTransclusion     = React.ComponentClass<MultiSelectItemProps>;
export type ComposedSelect       = React.ComponentClass<MultiSelectProps>;

export const CLASSES = {
  MULTISELECT_ITEM           : "hoctable__multiselect-item",
  MULTISELECT_ITEM_TOGGLE    : "hoctable__multiselect-item-toggle",
  MULTISELECT_ITEM_TEXT      : "hoctable__multiselect-item-text",
  MULTISELECT                : "hoctable__multiselect"
};

function ItemFactory(Inner : React.ComponentClass<MultiSelectItemProps>) : ItemTransclusion {

  class Item extends React.Component<MultiSelectItemProps, any> {

    render() : React.ReactElement<any> {
      let { props } = this;
      let { delegate, option, signals } = props;
      let selected = delegate.isSelected(option);

      function finished() : void {
        signals.selection();
      }

      function select() : void {
        return delegate.toggle(option, finished);
      }

      if(Inner) {
        let content = <Inner {...props} />;

        return (<div className={CLASSES["MULTISELECT_ITEM"]} onClick={select}>{content}</div>);
      }

      return (
        <div className={CLASSES["MULTISELECT_ITEM"]}>
          <div className={CLASSES["MULTISELECT_ITEM_TOGGLE"]}>
            <input type="checkbox" onChange={select} checked={selected} />
          </div>
          <div className={CLASSES["MULTISELECT_ITEM_TEXT"]}>
            <p>{delegate.translate(option)}</p>
          </div>
        </div>
      );
    }

  }

  return Item;

}

function Factory(Item : ItemTransclusion, ButtonComponent = DefaultButton) : ComposedSelect {
  const ComposedItem = ItemFactory(Item);

  class MultiSelect extends React.Component<MultiSelectProps, any> {
    private options : Array<HTMLElement>;

    constructor(props) {
      super(props);
      this.options    = [];
      this.transclude = this.transclude.bind(this);
    }

    transclude(list_el : HTMLElement) : void {
      let { delegate, close } = this.props;
      let { options } = this;

      if(!list_el) {
        return;
      }

      let signals = { selection: this.forceUpdate.bind(this) };

      function render(option_list : Array<any>) : void {
        let { childNodes: children } = list_el;

        // Cleanup previously rendered options
        while(options.length) {
          let [next] = options.splice(0, 1);
          ReactDOM.unmountComponentAtNode(next);
          utils.dom.remove(next);
        }

        /* Iterate over the options returned by the delegate, rendering them into the list element reference provided
         * by react during the `ref` callback.
         */
        for(let i = 0, c = option_list.length; i < c; i++) {
          let option = option_list[i];
          let body   = document.createElement("div");

          ReactDOM.render(<ComposedItem delegate={delegate} option={option} signals={signals} />, body);
          list_el.appendChild(body);
          options.push(body);
        }
      }

      delegate.options(render);
    }

    render() : React.ReactElement<any> {
      return (<div className={CLASSES["MULTISELECT"]} ref={this.transclude}></div>);
    }

  }

  return ActionMenu<MultiSelectProps>(MultiSelect, ButtonComponent);

}

export default Factory;
