import i18n from "../../services/i18n";
import IssueTable from "../../components/issues/table";
import OpenFilter from "../../components/issues/open_filter";

class Index extends React.Component {

  constructor(props) {
    super(props);
    let {filters} = props;

    function update() {
      this.setState({updated: Date.now()});
    }

    this.listeners = {filters: filters.on(update.bind(this))};
  }

  componentWillUnmount() {
    let {listeners, props} = this;
    let {filters} = props;
    filters.off(listeners.filters);
  }

  render() {
    let {props} = this;
    let {"table-delegate": table_delegate, filters} = props;

    return (

      <div className="row collapse">
        <div className="clearfix">
          <div className="margin-bottom-1">
            <OpenFilter delegate={filters} />
          </div>
          <IssueTable delegate={table_delegate} />
        </div>
      </div>
    );
  }

}

export default Index;
