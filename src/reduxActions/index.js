export const updateMineSocketDbData = ( idList = [] ) => {
  return {
    type: 'UPDATE_MINE_SOCKET_DB_DATA',
    payload: idList
  };
};
