const express    = require("express");
const people     = require("./routes/people");
const properties = require("./routes/properties");
const products   = require("./routes/products");
const issues     = require("./routes/issues");

let app = express();

app.get("/people", people);
app.get("/properties", properties);
app.get("/products", products);
app.get("/issues", issues.index);
app.get("/issues/comments", issues.comments);

function start() {
  app.listen("4000");
}

module.exports = {start};
