import MenuFactory, { PopupCloseCallback } from "hoctable/hoc/menu";
import { ItemProps, DefaultButton } from "hoctable/hoc/select";
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

export interface MultiSelectSearchProps {
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
      const { props } = this;
      const { delegate, option, signals } = props;
      const selected = delegate.isSelected(option);

      const finished = (remain_open? : boolean) : void => {
        signals.selection(remain_open);
      };

      const select = () : void => {
        return delegate.toggle(option, finished);
      };

      if(Inner) {
        const content = <Inner {...props} />;

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

export function DefaultSearch(props : MultiSelectSearchProps) : React.ReactElement<MultiSelectSearchProps> {
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
    private render_request : string;

    constructor(props) {
      super(props);
      this.options = [];
      this.state = { };
    }

    componentWillUnmount() : void {
      this.render_request = null;
      this.search_timeout = null;
    }

    transclude(list_el : HTMLElement) : void {
      const { options, state, props} = this;
      const { delegate } = props;

      if(!list_el) {
        return;
      }

      const selection = () : void => {
        this.setState({ updated: Date.now() });
      };

      const signals = { selection };
      const current_request = this.render_request = utils.uuid();

      const render = (option_list : Array<any>) : void  => {
        const { render_request } = this;

        // Prevent bad rendering.
        if(render_request !== current_request) {
          return;
        }

        // Cleanup previously rendered options
        while(options.length) {
          const [ next ] = options.splice(0, 1);
          ReactDOM.unmountComponentAtNode(next);
          utils.dom.remove(next);
        }

        /* Iterate over the options returned by the delegate, rendering them into the list element reference provided
         * by react during the `ref` callback.
         */
        for(let i = 0, c = option_list.length; i < c; i++) {
          const option = option_list[i];
          const body   = document.createElement("div");

          ReactDOM.render(<ComposedItem delegate={delegate} option={option} signals={signals} />, body);
          list_el.appendChild(body);
          options.push(body);
        }
      };

      const params : OptionsDataLoaderParams = { query: state.query };
      delegate.options(params, render);
    }

    search(event : React.ChangeEvent<HTMLInputElement>) : void {
      const { target } = event;
      const { value: query } = target;

      let current_timeout = null;

      const update = () : void => {
        const { search_timeout } = this;

        if(search_timeout !== current_timeout) {
          return;
        }

        this.setState({ query });
      };

      if(this.search_timeout) {
        clearTimeout(this.search_timeout);
      }

      current_timeout = setTimeout(update, DEBOUNCE_TIME);
      this.search_timeout = current_timeout;
    }

    render() : React.ReactElement<any> {
      const { props, state } = this;
      let search = null;

      if(Search !== null) {
        const search_props = { value: state.query, delegate: props.delegate };
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
