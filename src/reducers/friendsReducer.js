
// TODO Please replace the static data below with the server data, use this endpoint http://localhost:3020/friends.
const friends = [
  {
    id: "4f733b92-e125-11e9-81b4-2a2ae2dbcce4",
    name: "Theodore Roosevelt",
    sex: "male",
    isStared: false,
  },
  {
    id: "4f733e1c-e125-11e9-81b4-2a2ae2dbcce4",
    name: "Abraham Lincoln",
    sex: "male",
    isStared: true,
  }
  ];

export default (state={ friends }, action) => {
  return state;
};
