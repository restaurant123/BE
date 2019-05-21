const usersRouter = require("express").Router();
const db = require("./users-models.js");
const { generateToken } = require("../../api/tokenCheck");
const restricted = require("../../api/restricted");
const bcrypt = require("bcrypt");

// Get all users /users
usersRouter.get("/", async (req, res) => {
  try {
    const user = await db.getUsers();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the users" });
  }
});

/**
 * @api {get} /users/:id        Get a user by the id with current active restaurants.
 * @apiVersion 1.0.0
 * @apiName GetUserWithRestaurants
 * @apiGroup Users
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/users/1');
 *
 * @apiParam {Number} id    User id.
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
  "id": 1,
  "created_at": "2019-05-20T04:20:43.000Z",
  "updated_at": "2019-05-21T02:35:03.374Z",
  "name": "Fancy Schaden",
  "email": "Ashtyn7@yahoo.com",
  "address": "99550 Marquardt Hill",
  "city": "Manhattan",
  "state": "New York",
  "zipCode": 14025,
  "restaurants": [
    {
      "restaurant_id": 1,
      "name": "Bartoletti and Sons",
      "address": "106 Jean Unions",
      "city": "Manhattan",
      "state": "New York",
      "zipCode": 14025,
      "visited": 0
    },
    {
      "restaurant_id": 2,
      "name": "Kohler - Kautzer",
      "address": "89359 Parker Mill",
      "city": "Manhattan",
      "state": "New York",
      "zipCode": 14025,
      "visited": 0
    },
    {
 *
 */

// Get users with restaurants --> /users/:id
usersRouter.get("/:id", restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getUsersRestaurants(id);
    user.id
      ? res.status(200).json(user)
      : res.status(404).json({ message: "Could not find user by that ID" });
    // console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Ran into an error retrieving data" });
    console.log(error);
  }
});

/**
 * @api {post} /users/register       User Register
 * @apiVersion 1.0.0
 * @apiName UserRegister
 * @apiGroup Users
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.post('/users/register');
 *
 *  @apiParam {String} name     Mandatory First and Last Name.
 *  @apiParam {String} email     Mandatory Email Address.
 *  @apiParam {String} password     Mandatory password.
 *  @apiParam {String} city     Mandatory city name, default Manhattan.
 *  @apiParam {String} state     Mandatory state name, default New York.
 *  @apiParam {Number} zipCode     Mandatory zipCode, default 14025.

 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
  "user": {
    "id": 15,
    "created_at": "2019-05-21T13:03:23.757Z",
    "updated_at": "2019-05-21T13:03:23.757Z",
    "name": "George Doe",
    "email": "george_doe@gmail.com",
    "password": "$2b$10$f3s72tsaTIkhbVh2IleeyOWCGRRlQVWWGaVfAAZQhur2lNCjx0fZG",
    "address": "1234 Street",
    "city": "Manhattan",
    "state": "New York",
    "zipCode": 14025
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTIxVDEzOjAzOjIzLjc1N1oiLCJ1cGRhdGVkX2F0Ijoi"
}
 *
 */

// Register for new users  --> /users/register
usersRouter.post("/register", (req, res) => {
  const user = req.body;
  if (
    !user ||
    !user.email ||
    !user.password ||
    !user.name ||
    !user.address ||
    !user.city ||
    !user.state ||
    !user.zipCode
  ) {
    return res.status(400).json({
      message: "Please fill out all the information needed.",
      status: 400
    });
  }

  user.password = bcrypt.hashSync(user.password, 10);
  db.addUser(user)
    .then(user => {
      if (user) {
        const token = generateToken(user);
        res.status(201).json({ user, token });
      } else {
        throw { message: "Something went wrong", status: 500 };
      }
    })
    .catch(err => {
      console.log(err);
      if (err.message.includes("users.email")) {
        return res.status(400).json({
          message:
            "Email is already taken, please try using another email address",
          status: 400
        });
      }
      res
        .status(err.status || 500)
        .json({ message: err.message, status: err.status || 500 });
    });
});

/**
 * @api {post} /users/login       User login
 * @apiVersion 1.0.0
 * @apiName PostUserLogin
 * @apiGroup Users
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.post('/users/login');
 *
 *  @apiParam {String} email     Mandatory Email Address.
 *  @apiParam {String} password     Mandatory password.
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
  "message": "Welcome Ray Doe!",
  "email": "ray_doe@gmail.com",
  "name": "Ray Doe",
  "id": 14,
  "status": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTIxVDAyOjU5OjAwLjY2NFoiLCJ1cGRh"
}
 *
 */

// Login existing users --> /users/login
usersRouter.post("/login", (req, res) => {
  let { email, password } = req.body;

  db.findUserByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "This user does not exist.",
          status: 404
        });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.name}!`,
          email: user.email,
          name: user.name,
          id: user.id,
          status: 200,
          token
        });
      } else {
        res.status(401).json({
          message: "You do not have access to this page!",
          status: 401
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(err.status || 500).json({
        message: err.message || "Issue with the server!",
        status: err.status || 500
      });
    });
});

/**
 * @api {put} /users/:id       Edit User
 * @apiVersion 1.0.0
 * @apiName EditUser
 * @apiGroup Users
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:4000',
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.put('/users/:id');
 *
 *  @apiParam {String} name     First and Last Name.
 *  @apiParam {String} [email]      Email Address.
 *  @apiParam {String} password     password.
 *  @apiParam {String} [address]      password.
 *  @apiParam {String} [city]     city name, default Manhattan.
 *  @apiParam {String} [state]     state name, default New York.
 *  @apiParam {Number} [zipCode]      zipCode.

 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
  "id": 1
}
 *
 */

// Put request to edit user --> /:id
usersRouter.put("/:id", restricted, async (req, res) => {
  const user = req.body;
  try {
    const { id } = req.params;
    const editUser = await db.updateUser(id, user);
    editUser
      ? res.status(200).json({ id: editUser.id })
      : res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The user information could not be modified."
    });
  }
});

module.exports = usersRouter;
