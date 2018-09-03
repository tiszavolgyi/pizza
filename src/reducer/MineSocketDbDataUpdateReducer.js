export default (state = null, action) => {
  switch (action.type) {
    case "SET_IS_DB_DATA_LOADED" :
      return action.payload;
    default:
      return state;
  }
}
