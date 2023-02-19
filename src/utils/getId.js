function getId(list) {

  // I want to get every id from the list
  const listOfIds = list.map((item) => (item.id === -Infinity ? 0 : parseInt(item.id, 10)));

  // I want to get the max id
  const maxId = Math.max(...listOfIds);
  // I want to return the max id + 1
  return maxId + 1;
}

export { getId };
