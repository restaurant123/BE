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
      if (err.message.includes("duplicate key value")) {
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

module.exports = usersRouter;
