import i18n from "../../services/i18n";
import Display from "../../components/issues/issue_display";

class Details extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {table: table_delegate, issue, store} = props;

    return (
      <div className="row collapse">
        <div className="clearfix"><Display issue={issue} delegate={table_delegate} store={store} /></div>
      </div>
    );
  }

}

export default Details;
