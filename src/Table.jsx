function Factory(RowTransclusion) {
  class Table extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      let {delegate} = this.props;
      console.log(delegate);

      return (
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      );
    }

  }

  return Table;
}

export {Factory};
