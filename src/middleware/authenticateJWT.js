const jwt = require("jsonwebtoken");
const {
  getRemoteConfigPropertiesForLogin,
} = require("../controllers/remoteConfigController");
const hasRole = require("../middleware/tokenValidation");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const remoteConfig = await getRemoteConfigPropertiesForLogin();
      jwt.verify(token, remoteConfig.secretKey, (err, user) => {
        if (err) {
          return res.status(403)
            .send("Access denied. Invalid Token."); // Forbidden
        }
        if (!hasRole(token, remoteConfig)) {
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
  } catch (error) {
    console.error("JWT verification error:", error);
  }
};

module.exports = authenticateJWT;
