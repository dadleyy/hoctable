import uuid from "./uuid";

function lower(s) {
  return s.toLowerCase();
}

function clean(s) {
  return s.replace(/(^\s+|\s+$)/g, "");
}

class Filters {

  constructor() {
    this.filters   = [];
    this.listeners = [];
  } 

  subscribe(update) {
    let id = uuid();
    this.listeners.push({ id, update });
    return id;
  }

  unsubscribe(target) {
    let { listeners } = this;
    this.listeners = listeners.filter(function({ id }) { return id !== target; });
  }

  get latest() {
    let { filters } = this;
    let result = { };

    for(let i = 0, c = filters.length; i < c; i++) {
      let { field, value } = filters[i];
      result[field] = value;
    }

    return result;
  }

  test(movie) {
    let { filters, latest } = this;

    if(filters.length === 0)
      return true;

    if(latest.title)
      return lower(movie.title).indexOf(lower(latest.title)) >= 0;

    let genres = movie.genres.split(",").map(clean);

    if(latest.genre && genres.indexOf(latest.genre) === -1)
      return false;

    return true;
  }

  dispatch(payload) {
    let { filters, listeners } = this;
    this.filters = filters.filter(function({ field }) { return field !== payload.field; });
    this.filters.push(payload);

    for(let i = 0, c = listeners.length; i < c; i++) {
      let { update, id } = listeners[i];
      update();
    }
  }

}

export default Filters;
