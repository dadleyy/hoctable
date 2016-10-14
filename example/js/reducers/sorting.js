export default function sorting(previous, action) {
  let result = Object.assign({}, previous);

  switch(action.type) {
    case "COLUMN_CLICK":
      let {rel} = action.column;
      result.rel = rel;
      if(rel === previous.rel) result.order = !result.order;
    default:
      break;
  }

  return result;
}
