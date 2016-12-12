import MOVIES from "../var/movies";
import i18n from "../services/i18n";

function clean(s) {
  return s.replace(/(^\s+|\s+$)/g, "");
}

class Delegate {

  constructor(filters) {
    this.filters = filters;
  }

  text() {
    let {latest} = this.filters;
    return latest.genre ? i18n(latest.genre) : i18n("select_genre");
  }

  select({genre}, callback) {
    let {filters} = this;

    if(genre === i18n("all"))
      genre = null;

    filters.dispatch({field: "genre", value: genre});
    callback();
  }

  translate({genre}) { return i18n(genre); }

  options(callback) {
    let options = [];
    let found   = {};

    for(let i = 0, c = MOVIES.length; i < c; i++) {
      let {genres: list} = MOVIES[i];
      let genres = list.split(",");

      for(let j = 0; j < genres.length; j++) {
        let genre = clean(genres[j]);
        if(found[genre] !== undefined) continue;
        found[genre] = true;
        options.push({genre});
      }
    }

    options.sort(function({genre: a}, {genre: b}) {
      if(a < b) return -1;
      if(b > a) return 1;
      return 0;
    });

    options.unshift({genre: i18n("all")});
    callback(options);
  }

}

export default Delegate;
