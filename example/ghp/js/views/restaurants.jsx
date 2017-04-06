import { hoc } from "hoctable";

import i18n from "services/i18n";
import AppNav from "components/app_nav";
import Table from "components/restaurants/table";

const Select = hoc.Select();
const MultiSelect = hoc.MultiSelect();

class Restaurants extends React.Component {

  constructor(props) {
    super(...arguments);
    let { filters } = props.resolution;
    let update = this.forceUpdate.bind(this);

    this.subscriptions = {
      filters: filters.subscribe(update)
    };
  }

  componentWillUnmount() {
    let { subscriptions, props } = this;
    let { filters } = props.resolution;
    filters.unsubscribe(subscriptions.filters);
  }

  componentWillMount() {
    const { geolocation } = window.navigator;
    const { filters } = this.props.resolution;

    if(!geolocation) {
      return false;
    }

    function success(position) {
      const { coords } = position;

      if(!coords) {
        return;
      }

      filters.dispatch({ field: "location", value: coords });
    }

    function error(e) {
      console.error(e);
    }

    geolocation.getCurrentPosition(success, error);
  }

  search({ target }) {
    let { resolution } = this.props;
    let { table_delegate, filters } = resolution;
    let { value } = target;

    if(this.throttle) {
      clearTimeout(this.throttle);
    }

    function run() {
      filters.dispatch({ field: "title", value });
    }

    this.throttle = setTimeout(run, 300);
  }

  render() {
    let { props } = this;

    return (
      <main>
        <section className="container margin-bottom-30">
          <AppNav />
        </section>
        <section className="container">
          <div className="margin-bottom-20 clearfix columns">
            <div className="column is-one-quarter is-paddingless">
              <input type="text" placeholder={i18n("search_restaurants")} onChange={this.search.bind(this)} />
            </div>
            <div className="float-left margin-left-10">
              <Select delegate={props.resolution.category_delegate} />
            </div>
            <div className="float-left margin-left-10">
              <MultiSelect delegate={props.resolution.city_delegate} />
            </div>
          </div>
          <Table delegate={props.resolution.table_delegate} />
        </section>
      </main>
    );
  }

}

export default Restaurants;

