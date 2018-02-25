import { Table as TableFactory } from "hoctable";
import * as React from "react";

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {row: {product, columns}} = props;
    let cells = [<td className="product-row__id" key="product_id"><p>{product.id}</p></td>];
    let {property_values} = product;

    function value(target_property_id) {
      for(let i = 0, c = property_values.length; i < c; i++) {
        let {property_id, value} = property_values[i];
        if(target_property_id === property_id) return value;
      }

      return null;
    }

    for(let i = 1, c = columns.length; i < c; i++) {
      let {rel, id} = columns[i];
      cells.push(<td className="product-row__id" key={rel}><p>{value(id)}</p></td>);
    }

    return (<tr className="product-row">{cells}</tr>);
  }

}


export default TableFactory(Row);
