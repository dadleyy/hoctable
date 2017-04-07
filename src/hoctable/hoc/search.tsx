import * as React from "react";

export interface SearchDelegate {
  translate : (identifier : string, item? : any) => string;
}

export interface SearchProps {
  delegate : SearchDelegate;
}

export const CLASSES = {
  SEARCH_CONTAINER: "hoctable__search"
};

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

    render() : React.ReactElement<any> {
      const { props, state } = this;
      const { delegate } = props;

      const search = ({ target }) => {
      };

      return (
        <div className={CLASSES["SEARCH_CONTAINER"]}>
          <input type="text" placeholder={delegate.translate("placeholder")} onChange={search} />
        </div>
      );
    }

  }

  return Search;

}

export default Factory;
