function age() {
  let top = (Math.random() * 50) % 100;
  return Math.ceil(top + 20);
}

const people = (function() { 
  let id = 0;
  return [
    {id: ++id, name: "Aaron", age: age()},
    {id: ++id, name: "Carly", age: age()},
    {id: ++id, name: "Danny", age: age()},
    {id: ++id, name: "Emily", age: age()},
    {id: ++id, name: "Freddy", age: age()},
    {id: ++id, name: "Tiffany", age: age()},
    {id: ++id, name: "Uman", age: age()},
    {id: ++id, name: "Grace", age: age()},
    {id: ++id, name: "Billy", age: age()},
    {id: ++id, name: "Kristin", age: age()},
    {id: ++id, name: "Hamlet", age: age()},
    {id: ++id, name: "Ivan", age: age()},
    {id: ++id, name: "David", age: age()},
    {id: ++id, name: "Juliet", age: age()},
    {id: ++id, name: "Lauren", age: age()},
    {id: ++id, name: "Oscar", age: age()},
    {id: ++id, name: "Michelle", age: age()},
    {id: ++id, name: "Nancy", age: age()},
    {id: ++id, name: "Stan", age: age()},
    {id: ++id, name: "Pippin", age: age()},
    {id: ++id, name: "Ralph", age: age()},
    {id: ++id, name: "Janice", age: age()},
    {id: ++id, name: "Xander", age: age()}
  ];

})();

module.exports = people;
