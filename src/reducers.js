function sorting(state, action) {
  let result = Object.assign({}, state);

  if(action.type !== "COLUMN_CLICK")
    return result;

  result.rel = action.column.rel;

  if(result.rel === state.rel)
    result.order = !state.order;

  return result;
}

function pagination(state, action) {
  return {};
}

export default {sorting, pagination};

