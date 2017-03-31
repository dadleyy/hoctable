import Filters from "services/filters";

function lower(s) {
  return s.toLowerCase();
}

function clean(s) {
  return s.replace(/(^\s+|\s+$)/g, "");
}

class MovieFilters extends Filters {

  test(movie) {
    let { filters, latest } = this;

    if(filters.length === 0) {
      return true;
    }

    if(latest.title) {
      return lower(movie.title).indexOf(lower(latest.title)) >= 0;
    }

    let genres = movie.genres.split(",").map(clean);

    return latest.genre ? genres.indexOf(latest.genre) !== -1 : true;
  }

}

export default MovieFilters;
