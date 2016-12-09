import {PaginationDelegate} from "hoctable/hoc/table";

class Pagination implements PaginationDelegate {
  private size : number;
  private current : number;
  private total : number;

  constructor(size = 10, current = 0) {
    this.size    = size;
    this.current = current;
  }

  goTo(page) {
    this.current = page;
  }

  pagination() {
    let {size, current, total} = this;
    return {size, current, total};
  }

}

export default Pagination;
