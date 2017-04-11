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

interface ControlsProps {
  clear : () => void;
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
  SEARCH_POPUP: "hoctable__search-popup",
  INPUT_CONTAINER: "hoctable__search-input-container",
  RESULTS_PLACEHOLDER: "hoctable__search-results-placeholder",
  SELECTION_CONTROL: "hoctable__search-selection-control",
  CLEAR_CONTROL_ICON: "hoctable__search-selection-clear-icon",
  ITEM_CONTAINER: "hoctable-search-results-item",
  CONTROLS: "hoctable__search-controls"
};

export interface SearchItemProps {
  option    : any;
  delegate? : SearchDelegate;
}

export const DEBOUNCE_TIME = 30;

function c(lookup : string) : string {
  return CLASSES[lookup];
}

export function DefaultItem(props : SearchItemProps) : React.ReactElement<any> {
  const { option, delegate } = props;

  return (
    <div className={c("ITEM_CONTAINER")}>
      <p>{delegate.translate("option", option)}</p>
    </div>
  );
}

function SelectionControl(props : ControlsProps) : React.ReactElement<any> {
  const { clear } = props;

  return (
    <div className="">
      <div className={c("SELECTION_CONTROL")} onClick={clear}>
        <i className={c("CLEAR_CONTROL_ICON")} />
      </div>
    </div>
  );
}

function ItemContainer(props : ItemContainerProps) : React.ReactElement<any> {
  const { signals, item } = props;
  const select = signals.select.bind(null, item);

  return (<div className={c("SEARCH_ITEM_CONTAINER")} onClick={select}>{props.children}</div>);
}

function Factory(ItemComponent? : React.ComponentClass<SearchItemProps>) : React.ComponentClass<SearchProps> {

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
      const { props, rendered_items } = this;
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
        const { left, top } = placeholder.getBoundingClientRect();
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

        const popup_node = (<div className={c("SEARCH_POPUP")}>{popup_children}</div>);

        // We should now safely close the previous popup
        Popups.close(this.popup_handle);

        this.popup_handle = Popups.open(popup_node, { left, top });
      };

      delegate.search(search_query, render);
    }

    render() : React.ReactElement<any> {
      const { props, state } = this;
      const { delegate } = props;
      const { selected_item } = state;
      const value = selected_item ? delegate.translate("selection", selected_item) : (state.value || "");

      const done = (selection : any) : void => {
        this.setState({ selected_item: selection });
      };

      const search = ({ target } : React.SyntheticEvent<HTMLInputElement>) => {
        const { value: new_value } = target as HTMLInputElement;
        const update = this.transclude.bind(this, new_value);

        if(this.state.timer) {
          clearTimeout(this.state.timer);
        }

        const timer = setTimeout(update, DEBOUNCE_TIME);

        if(selected_item) {
          state.timer = timer;
          state.value = new_value;

          return delegate.select(null, done);
        }

        this.setState({ timer, value: new_value, selected_item: null });
      };

      const clear = () : void => {
        const { state: current_state } = this;

        clearTimeout(current_state.timer);

        // Clear out the value in the input element.
        current_state.value = "";

        return delegate.select(null, done);
      };

      const control = selected_item ? <SelectionControl clear={clear} /> : null;

      return (
        <div className={c("SEARCH")}>
          <div className={c("CONTROLS")}>{control}</div>
          <div className={c("INPUT_CONTAINER")}>
            <input type="text" placeholder={delegate.translate("placeholder")} onChange={search} value={value} />
          </div>
          <div className={c("RESULTS_PLACEHOLDER")} ref="placeholder" />
        </div>
      );
    }

  }

  return Search;

}

export default Factory;
