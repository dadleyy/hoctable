import { hoc } from "hoctable";

import i18n from "services/i18n";
import AppNav from "components/app_nav";
import Table from "components/restaurants/table";
import CuisineDelegate from "delegates/menus/cuisines";

const Select = hoc.Select();
const MultiSelect = hoc.MultiSelect();
const Search = hoc.Search();

class Restaurants extends React.Component {

  constructor(props) {
    super(...arguments);
    let { filters } = props.resolution;

    const update = () => {
      if(!this.subscriptions.filters) return;
      this.setState({ updated: Date.now() });
    };

    this.subscriptions = {
      filters: filters.subscribe(update)
    };
  }

  componentWillUnmount() {
    let { subscriptions, props } = this;
    let { filters } = props.resolution;
    filters.unsubscribe(subscriptions.filters);
    delete subscriptions.filters;
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
    const { props } = this;
    const { resolution } = props;
    const { api_credentials, filters } = resolution

    const controls = [(
      <div className="float-left" key="categories">
        <Select delegate={props.resolution.category_delegate} />
      </div>
    ), (
      <div className="float-left margin-left-10" key="cities">
        <Search delegate={props.resolution.city_delegate} />
      </div>
    )];


    if(filters.latest.city) {
      const cuisine_delegate = new CuisineDelegate(api_credentials, filters);
      const cuisine_control = (
        <div className="float-left margin-left-10" key="cuisines">
          <MultiSelect delegate={cuisine_delegate} />
        </div>
      );

      controls.push(cuisine_control);
    }

    return (
      <main>
        <section className="container margin-bottom-30">
          <AppNav />
        </section>
        <section className="container">
          <div className="margin-bottom-20 clearfix columns">
            <div className="column is-one-quarter is-paddingless-tb">
              <input type="text" placeholder={i18n("search_restaurants")} onChange={this.search.bind(this)} />
            </div>
            <div className="float-left clearfix margin-left-10">{controls}</div>
          </div>
          <Table delegate={props.resolution.table_delegate} />
        </section>
        <hr />
        <section className="container">
          <div className="powered-by media">
            <div className="level-left margin-right-20"><p>{i18n("powered_by")}</p></div>
            <div className="level-left">
              <a href="https://developers.zomato.com" rel="noopener">
                <img src="//b.zmtcdn.com/images/logo/zomato_logo.svg" height="120" width="120px"/>
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

}

export default Restaurants;

