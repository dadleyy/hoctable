import * as hoctable from "hoctable";
import i18n from "services/i18n";

import DemoTable from "components/movies/table";
import AppNav from "components/app_nav";

const Select = hoctable.hoc.Select();

// Movies View
//
// This component demonstrates an example of a react application "view" that renders out an instance of the hoctable
// table and menu components. The delegates for these are resolved into the view by the route in order to allow url
// based initial state preparation.
class Movies extends React.Component {

  constructor(props) {
    super(props);
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

  search({target}) {
    let { resolution } = this.props;
    let { table_delegate, filters } = resolution;
    let { value } = target;
    filters.dispatch({ field: "title", value });
  }

  render() {
    let { resolution } = this.props;
    let { table_delegate, genre_delegate, filters } = resolution;

    return (
      <main className="index-page">
        <section className="container margin-bottom-30">
          <AppNav />
        </section>
        <section className="container">
          <div className="container columns">
            <div className="column is-one-quarter">
              <input type="text" placeholder={i18n("search_titles")} onChange={this.search.bind(this)} />
            </div>
            <div className="column is-one-quarter">
              <div className="float-left">
                <Select delegate={genre_delegate} />
              </div>
            </div>
          </div>
          <hr />
          <DemoTable delegate={table_delegate} />
        </section>
      </main>
    );
  }

}

export default Movies;
