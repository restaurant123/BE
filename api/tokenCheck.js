const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

const generateToken = user => {
  const payload = {
    ...user,
    password: undefined
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = {
  generateToken
};
