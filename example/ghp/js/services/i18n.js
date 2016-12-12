import dictionary from "../var/en";

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
