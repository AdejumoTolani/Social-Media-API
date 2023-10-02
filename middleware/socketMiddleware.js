let users = [];
const addUser = (username, socketId) => {
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });
    console.log(users)
};
const removeUser = ( socketId) => {
   users = users.filter(user => user.socketId !== socketId);
}

const  getUser = (username) => {
    return users.find(user => user.username == username)
}

const getUsers = () => {
    return users
}

module.exports = {addUser, removeUser, getUser, getUsers}