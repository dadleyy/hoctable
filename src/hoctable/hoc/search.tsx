import * as React from "react";

export type DataLoadCallback = (results : Array<any>) => void;

export interface SearchDelegate {
  translate : (identifier : string, item? : any) => string;
  search : (query : string, callback : DataLoadCallback) => void;
}

export interface SearchProps {
  delegate : SearchDelegate;
}

export const CLASSES = {
  SEARCH: "hoctable__search",
  INPUT_CONTAINER: "hoctable__search-input-continer",
  RESULTS_PLACEHOLDER: "hoctable__search-results-placeholder"
};

export const DEBOUNCE_TIME = 30;

export function DefaultItem({ item }) : React.ReactElement<any> {
  return (
    <div className={CLASSES["SEARCH_ITEM_CONTAINER"]}>
    </div>
  );
}

function Factory(ItemComponent = DefaultItem) : React.ComponentClass<SearchProps> {

  class Search extends React.Component<SearchProps, any> {

    constructor(props) {
      super(props);
      this.state =  { };
    }

    transclude(search_query : string) : void {
      const { props, refs } = this;
      const { delegate } = props;

      function render(results : Array<any>) : void {
      }

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
