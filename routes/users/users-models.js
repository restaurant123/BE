const db = require("../../database/dbConfig.js");

function findUser() {
  return db("users").select("id", "email", "password", "address");
}

function getUsers(users) {
  return db("users");
}

function findUserBy(user) {
  return db("users").where(user);
}

async function addUser(user) {
  const [id] = await db("users").insert(user);

  return findUserById(id);
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

const findUserByEmail = email => {
  return db("users")
    .where({ email: email })
    .first();
};

const updateUser = user => {
  return db("users")
    .where({ id: user.id })
    .update(user);
};

module.exports = {
  addUser,
  findUser,
  findUserBy,
  findUserById,
  updateUser,
  findUserByEmail,
  getUsers
};
