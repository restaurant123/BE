const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../routes/users/users.js");
const restaurantsRouter = require("../routes/restaurants/restaurants.js");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/users", usersRouter);
server.use("/restaurants", restaurantsRouter);

server.get("/", (req, res) => {
  res.status(200).send("Running database now...");
});

module.exports = server;
