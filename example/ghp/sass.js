const sass = require("node-sass");

module.exports = {

  'nodeEnv($variable_name)': function(variable_name) {
    const vn = variable_name.getValue();
    return new sass.types.String(process.env[vn]);
  }

};
