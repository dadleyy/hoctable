import {ColumnDefinition, ColumnDelegate} from "hoc/table";

class Sorting implements ColumnDelegate {
  public orderby   : string;
  public direction : boolean;

  constructor(default_column? : ColumnDefinition) {
    this.orderby   = default_column ? default_column.rel : null;
    this.direction = true;
  }

  sort(column) {
    let {rel: orderby} = column;

    if(orderby === this.orderby)
      this.direction = !this.direction;

    this.orderby = orderby;
  }

  isActive(column) {
    let {orderby} = this;
    return column.rel === orderby;
  }

}

export default Sorting;
