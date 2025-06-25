const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const hasRole = require("../middleware/tokenValidation");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, keys.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      if (!hasRole(token)) {
        return res
          .status(403)
          .send("Access denied. You do not have the required role.");
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
