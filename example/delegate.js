function replace(a1, a2) {
  let args = [0, a1.length].concat(a2);
  return a1.splice.apply(a1, args);
}

class Delegate {

  constructor() {
    this.people = [];
  }

  columns() {
    return [{
      rel: "name",
      name: "Full Name"
    }, {
      rel: "age",
      name: "Age"
    }];
  }

  refresh(callback) {
    let {people} = this;

    function success(_, response) {
      let {results} = response;
      replace(people, results);
      callback(false);
    }

    function failed() {
      callback(true);
    }

    qwest.get("http://api.randomuser.me/?format=json&results=10")
      .then(success)
      .catch(failed);
  }

  rows() {
    let {people} = this;
    return people.map(function(person) { return {person, $key: person.email}; });
  }

}

export default Delegate;
