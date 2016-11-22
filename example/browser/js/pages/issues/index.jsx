import i18n from "../../services/i18n";
import IssueTable from "../../components/issues/table";

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {table: table_delegate, store} = props;

    return (
      <div className="row collapse">
        <div className="clearfix"><IssueTable delegate={table_delegate} store={store} /></div>
      </div>
    );
  }

}

export default Index;
