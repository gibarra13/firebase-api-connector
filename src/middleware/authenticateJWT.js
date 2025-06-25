const jwt = require("jsonwebtoken");
const { getRemoteConfigPropertiesForLogin } = require('../controllers/remoteConfigController');
const hasRole = require("../middleware/tokenValidation");



const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const remoteConfig = await getRemoteConfigPropertiesForLogin();

    jwt.verify(token, remoteConfig.secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
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
};

module.exports = authenticateJWT;
