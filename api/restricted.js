const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log(err);
          res
            .status(401)
            .json({ status: 401, message: "You cannot access this page!" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: "You cannot access this page!", status: 401 });
    }
  } catch (e) {
    console.log(e);
  }
};
