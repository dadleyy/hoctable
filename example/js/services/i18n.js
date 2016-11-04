/* i18n
 *
 * Normally, this module would be more advanced and pull in translations from either
 * the server or other modules. The goal is simply to define a function that takes
 * a "path" and returns a user-friendly copy associated w/ it.
 */

let dictionary = {
  category: "Category",
  color: "Color",
  id: "ID",
  operators: {
    equals: "Equals",
    greater_than: "Greater Than",
    less_than: "Less Than",
    has_value: "Has Any Value",
    has_no_value: "Has No Value",
    is_any: "Is Any",
    contains: "Contains"
  },
  product_name: "Product Name",
  select_property: "Select a Property",
  select_operator: "Select an Operator",
  select_value: "Select Value",
  unknown_property: "Unkown Property",
  weight: "Weight",
  wireless: "Wireless"
};

function i18n(lookup) {
  let splits = lookup.split(".");
  let cursor = dictionary;

  while(splits.length) {
    let step = splits.shift();
    if(false === cursor.hasOwnProperty(step)) return lookup;
    cursor = cursor[step];
  }

  return cursor;
}

export default i18n;
