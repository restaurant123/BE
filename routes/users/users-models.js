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
  const [id] = await db("users").insert(user, "id");

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

function getUsersRestaurants(id) {
  const user = db("users")
    .where({ id })
    .select(
      "users.id ",
      "users.name",
      "users.email",
      "users.address",
      "users.city",
      "users.state",
      "users.zipCode"
    )
    .first();

  const restaurants = db("restaurants")
    .join("users", "users.id", "users.id")
    .select(
      "restaurants.id",
      "restaurants.name",
      "restaurants.address",
      "restaurants.city",
      "restaurants.state",
      "restaurants.zipCode",
      "restaurants.visited"
    )
    .where("users.id", "=", id);

  return Promise.all([user, restaurants]).then(list => {
    const [user, restaurants] = list;
    return { ...user, restaurants };
  });
}

function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findUserById(id);
      } else {
        return null;
      }
    });
}

module.exports = {
  addUser,
  findUser,
  findUserBy,
  findUserById,
  updateUser,
  findUserByEmail,
  getUsers,
  getUsersRestaurants
};
