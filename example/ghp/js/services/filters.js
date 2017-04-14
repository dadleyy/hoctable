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

  dispatch(...payloads) {
    let { filters, listeners } = this;

    // Get a list of the fields in the payloads provided.
    const fields = payloads.map(({ field }) => { return field; });

    // Filter the existing filters so that only the fields not in our payload are present.
    const unique = filters.filter(({ field }) => { return fields.indexOf(field) === -1; });

    // Update our fields array with the unique filters and our payload.
    this.filters = [ ...unique, ...payloads ];

    for(let i = 0, c = listeners.length; i < c; i++) {
      let { update, id } = listeners[i];
      update();
    }
  }

}

export default Filters;
