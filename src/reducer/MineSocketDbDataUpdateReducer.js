export default (state = null, action) => {
  switch (action.type) {
    case "UPDATE_MINE_SOCKET_DB_DATA" :
      return action.payload;
    default:
      return state;
  }
}
