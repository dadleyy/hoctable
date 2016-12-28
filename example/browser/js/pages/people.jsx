import * as React from "react";
import Table from "../components/person_table";

class Paged extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(event) {
    let {target: {value}} = event;
    delegate.query = value;
  }

  render() {
    let {props} = this;
    let {delegate} = props;

    return (
      <div className="clearfix">
        <div className="border-bottom">
          <h6>Paged Example <a href="/unmounted">Unmount</a></h6>
        </div>
        <div className="clearfix">
          <input type="text" onInput={this.search} placeholder="Search Names" />
        </div>
        <Table delegate={delegate} />
      </div>
    );
  }

}

export default Paged;
