const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const hasRole = (token) => {
  try {
    if (!token) {
      return false;
    }
    let fixedToken = token;
    if (token.startsWith("Bearer ")) {
      fixedToken = token.split(" ")[1];
    }

    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(fixedToken, keys.SECRET_KEY);
    return decoded.role && decoded.role.includes(keys.SYS_ROLE);
  } catch (error) {
    return false;
  }
};
module.exports = hasRole;

// const tokenValidation = (token) => {
//   try {
//     const decoded = jwt.verify(token, keys.SECRET_KEY);
//     return {
//       isValid: true,
//       data: decoded,
//       roles: decoded.roles // Acceder a los roles desde el payload decodificado
//     };
//   } catch (error) {
//     return {
//       isValid: false,
//       error: error.message
//     };
//   }
// }
// module.exports = tokenValidation;
