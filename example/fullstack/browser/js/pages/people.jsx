import * as React from "react";
import Table from "../components/person_table";

class Paged extends React.Component {

  constructor(props) {
    super(props);
  }

  search({ target = { } }) {
    let { delegate } = this.props;
    let { value } = target;
    delegate.query = value;
    this.setState({ updated: Date.now() });
  }

  render() {
    let { props } = this;
    let { delegate } = props;

    return (
      <div className="clearfix">
        <div className="border-bottom">
          <h6>Paged Example <a href="/unmounted">Unmount</a></h6>
        </div>
        <div className="clearfix">
          <input type="text" onInput={this.search.bind(this)} placeholder="Search Names" />
        </div>
        <Table delegate={delegate} />
      </div>
    );
  }

}

export default Paged;
