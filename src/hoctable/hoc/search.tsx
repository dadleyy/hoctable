import util from "hoctable/utils";
import Popups from "hoctable/services/popups";
import { PopupHandleReference, PopupPlacement } from "hoctable/services/popups";
import * as React from "react";

export type DataLoadCallback = (results : Array<any>) => void;
export type ItemSelectedCallback = (selected_item : any) => void;

export interface SearchDelegate {
  translate : (identifier : string, item? : any) => string;
  search : (query : string, callback : DataLoadCallback) => void;
  select : (item : any, callback : ItemSelectedCallback) => void;
}

export interface ItemContainerSignals {
  select : (item : any) => void;
}

export interface ItemContainerProps {
  signals   : ItemContainerSignals;
  item      : any;
  children? : any;
}

export interface SearchProps {
  delegate : SearchDelegate;
}

export interface RenderedItemMapping {
  uuid : string;
  node : React.ReactNode;
}

export const CLASSES = {
  SEARCH: "hoctable__search",
  INPUT_CONTAINER: "hoctable__search-input-continer",
  RESULTS_PLACEHOLDER: "hoctable__search-results-placeholder",
  ITEM_CONTAINER: "hoctable-search-results-item"
};

export interface ItemProps {
  option    : any;
  delegate? : SearchDelegate;
}

export const DEBOUNCE_TIME = 30;

export function DefaultItem(props : ItemProps) : React.ReactElement<any> {
  const { option, delegate } = props;

  return (
    <div className={CLASSES["ITEM_CONTAINER"]}>
      <p>{delegate.translate("option", option)}</p>
    </div>
  );
}

function ItemContainer(props : ItemContainerProps) : React.ReactElement<any> {
  const { signals, item } = props;
  const select = signals.select.bind(null, item);

  return (<div className={CLASSES["SEARCH_ITEM_CONTAINER"]} onClick={select}>{props.children}</div>);
}

function Factory(ItemComponent? : React.ComponentClass<ItemProps>) : React.ComponentClass<SearchProps> {

  class Search extends React.Component<SearchProps, any> {
    private popup_handle : any;
    private rendered_items : Array<RenderedItemMapping>;

    constructor(props) {
      super(props);
      this.state =  { };
      this.rendered_items = [ ];
    }

    componentWillUnmount() : void {
      const { popup_handle, rendered_items } = this;

      Popups.close(popup_handle);
    }

    transclude(search_query : string) : void {
      const { props, refs, rendered_items } = this;
      const { delegate } = props;

      const done = (selected_item : any) : void => {
        const { popup_handle } = this;

        Popups.close(popup_handle);
        this.setState({ selected_item });
      };

      const select = (item : any) : void => {
        delegate.select(item, done);
      };

      const signals = { select };

      const previous_items = rendered_items.splice(0, rendered_items.length);

      const render = (results : Array<any>) : void => {
        const placeholder = this.refs["placeholder"] as HTMLElement;
        const bounding = placeholder.getBoundingClientRect();
        const popup_children : Array<React.ReactNode> = [ ];

        for(let i = 0, c = results.length; i < c; i++) {
          const item_data = results[i];
          const uuid = util.uuid();
          const item_props = ItemComponent ? { option: item_data } : { option: item_data, delegate };
          const inner = ItemComponent ? (<ItemComponent {...item_props }/>) : (<DefaultItem {...item_props} />);
          const node = (<ItemContainer signals={signals} item={item_data} key={uuid}>{inner}</ItemContainer>);

          rendered_items.push({ node, uuid });
          popup_children.push(node);
        }

        const popup_node = (<div className={CLASSES["SEARCH_POPUP"]}>{popup_children}</div>);
        this.popup_handle = Popups.open(popup_node, bounding);
      };

      delegate.search(search_query, render);
    }

    render() : React.ReactElement<any> {
      const { props, state } = this;
      const { delegate } = props;

      const search = ({ target }) => {
        const update = this.transclude.bind(this, target.value);

        if(this.state.timer) {
          clearTimeout(this.state.timer);
        }

        this.state.timer = setTimeout(update, DEBOUNCE_TIME);
      };

      return (
        <div className={CLASSES["SEARCH"]}>
          <div className={CLASSES["INPUT_CONTAINER"]}>
            <input type="text" placeholder={delegate.translate("placeholder")} onChange={search} />
          </div>
          <div className={CLASSES["RESULTS_PLACEHOLDER"]} ref="placeholder" />
        </div>
      );
    }

  }

  return Search;

}

export default Factory;
