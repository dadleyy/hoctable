import defer from "services/defer";
import MOVIES from "var/movies";

// Movies service
//
// Since the movie data for this example is hard-coded in a json file, this point of this service is to mimic the
// functionality of a server-side api for asynchronous data source demonstration purposes. Normally in a "real" 
// application, the delegates would simply make xhr calls to a server-side api with the sorting/pagination information.

const MAX_NETWORK_TIME = 400;
const MIN_NETWORK_TIME = 30;

function extract(movie, field) {
  return movie[field];
}

function throttle() {
  return Math.floor(Math.random() * MAX_NETWORK_TIME) + MIN_NETWORK_TIME;
}

function find(filters, max, current_page, orderby) {
  let { promise, resolve, reject } = defer.defer();
  let results = [];
  let direction = orderby && orderby.charAt(0) === "-";
  let sort_field = direction ? orderby.substr(1) : orderby;

  for(let i = 0, c = MOVIES.length; i < c; i++) {
    let movie = MOVIES[i];

    if(filters.test(movie) === false)
      continue;

    results.push(movie);
  }

  function applySort(movie_a, movie_b) {
    let va = extract(movie_a, sort_field);
    let vb = extract(movie_b, sort_field);
    let result = 0;

    if(va < vb) 
      result = -1;

    if(va > vb)
      result = 1;

    return direction ? result : (result * -1);
  }

  results.sort(applySort);

  let total = results.length;
  let start = max * current_page;
  let end   = start + max;

  results = results.slice(start, end);

  function finish() {
    resolve({ results, total });
  }

  setTimeout(finish, throttle());

  return promise;
}

export default { find };
