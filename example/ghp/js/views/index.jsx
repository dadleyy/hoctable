import * as hoctable from "hoctable";

import Filters from "../services/filters";
import i18n from "../services/i18n";
import HeroTitle from "../components/bulma/hero_title";

import DemoTable from "../components/demos/table";
import TableDelegate from "../delegates/table";

import GenreDelegate from "../delegates/genre_menu";

const Select = hoctable.hoc.Select();

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.filters        = new Filters();
    this.table_delegate = new TableDelegate(this.filters);
    this.genre_delegate = new GenreDelegate(this.filters);
    this.search         = this.search.bind(this);

    let update = this.forceUpdate.bind(this);
    this.filters.subscribe(update);
  }

  search({target}) {
    let {table_delegate, filters} = this;
    let {value} = target;
    filters.dispatch({field: "title", value});
  }

  render() {
    let {table_delegate, genre_delegate, filters} = this;

    return (
      <div className="index-page">
        <HeroTitle title={i18n("project_title")} subtitle={i18n("project_subtitle")} />
        <hr />
        <section className="container">
          <div className="container columns">
            <div className="column is-one-quarter">
              <input type="text" placeholder={i18n("search_titles")} onChange={this.search} />
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
      </div>
    );
  }

}

export default Index;
