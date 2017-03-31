import i18n from "services/i18n";
import AppNav from "components/app_nav";
import Table from "components/restaurants/table";

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

  render() {
    let { props } = this;

    return (
      <main>
        <section className="container margin-bottom-30">
          <AppNav />
        </section>
        <section className="container">
          <Table delegate={props.resolution.table_delegate} />
        </section>
      </main>
    );
  }

}

export default Restaurants;

