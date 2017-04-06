import MenuFactory from "hoctable/hoc/menu";
import { ItemSignals, ItemProps, DefaultButton } from "hoctable/hoc/select";
import { PopupCloseCallback } from "hoctable/hoc/menu";
import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export type OptionsCallback = (results : Array<any>) => void;
export type ToggledCallback = () => void;
export type OptionsDataLoader = (params : OptionsDataLoaderParams, callback : OptionsCallback) => void;

export interface OptionsDataLoaderParams {
  query : string;
}

export interface MultiSelectDelegate {
  options    : OptionsDataLoader;
  toggle     : (item : any, callback : ToggledCallback) => void;
  translate? : (identifier : string, item? : any) => string;
  isSelected : (item : any) => boolean;
}

export interface MultiSelectProps {
  delegate : MultiSelectDelegate;
  close    : PopupCloseCallback;
}

export interface SearchProps {
  value    : string;
  search   : (value : React.ChangeEvent<HTMLInputElement>) => void;
  delegate : MultiSelectDelegate;
}

export type MultiSelectItemProps = ItemProps<MultiSelectDelegate>;
export type ItemTransclusion     = React.ComponentClass<MultiSelectItemProps>;
export type ComposedSelect       = React.ComponentClass<MultiSelectProps>;

export const DEBOUNCE_TIME = 30;

export const CLASSES = {
  MULTISELECT_ITEM             : "hoctable__multiselect-item",
  MULTISELECT_ITEM_LIST        : "hoctable__multiselect-item-list",
  MULTISELECT_ITEM_TOGGLE      : "hoctable__multiselect-item-toggle",
  MULTISELECT_ITEM_TEXT        : "hoctable__multiselect-item-text",
  MULTISELECT_SEARCH           : "hoctable__multiselect-search",
  MULTISELECT_SEARCH_CONTAINER : "hoctable__multiselect-search-box",
  MULTISELECT                  : "hoctable__multiselect"
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
            <p>{delegate.translate("option", option)}</p>
          </div>
        </div>
      );
    }

  }

  return Item;

}

export function DefaultSearch(props : SearchProps) : React.ReactElement<SearchProps> {
  const { value, search, delegate } = props;

  return (
    <div className={CLASSES["MULTISELECT_SEARCH"]}>
      <input type="text" value={value || ""} placeholder={delegate.translate("placeholder")} onChange={search} />
    </div>
  );
}

function Factory(Item : ItemTransclusion, ButtonComponent = DefaultButton, Search = DefaultSearch) : ComposedSelect {
  const ComposedItem = ItemFactory(Item);

  class MultiSelect extends React.Component<MultiSelectProps, any> {
    private options        : Array<HTMLElement>;
    private search_timeout : number;

    constructor(props) {
      super(props);
      this.options = [];
      this.state = { };
    }

    transclude(list_el : HTMLElement) : void {
      let { options, state, props} = this;
      let { delegate, close } = props;

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

      let params : OptionsDataLoaderParams = { query: state.query };
      delegate.options(params, render);
    }

    search(event : React.ChangeEvent<HTMLInputElement>) : void {
      const { target } = event;
      const { value: query } = target;

      const update = () : void => {
        let { search_timeout } = this;

        if(search_timeout !== current_timeout) {
          return;
        }

        this.setState({ query });
      };

      if(this.search_timeout) {
        clearTimeout(this.search_timeout);
      }

      const current_timeout = setTimeout(update, DEBOUNCE_TIME);
      this.search_timeout = current_timeout;
    }

    render() : React.ReactElement<any> {
      const { props, state } = this;
      let search = null;

      if(Search !== null) {
        let search_props = { value: state.query, delegate: props.delegate };
        search = (<Search {...search_props} search={this.search.bind(this)}/>);
      }

      return (
        <div className={CLASSES["MULTISELECT"]}>
          <div className={CLASSES["MULTISELECT_SEARCH_CONTAINER"]}>{search}</div>
          <div className={CLASSES["MULTISELECT_ITEM_LIST"]} ref={this.transclude.bind(this)} />
        </div>
      );
    }

  }

  return MenuFactory<MultiSelectProps>(MultiSelect, ButtonComponent);

}

export default Factory;
