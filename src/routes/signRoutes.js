const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getRemoteConfigPropertiesForLogin } = require('../controllers/remoteConfigController');

// Mock de base de datos de usuarios (reemplazar con una base de datos real)
let users = [];
//SOlo para efectos de prueba, no usar en producción
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    console.debug(hashedPassword);
    users.push(user);
    res.status(201).send("Usuario registrado");
  } catch {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {  
  const remoteConfig = await getRemoteConfigPropertiesForLogin();
  if (!remoteConfig) {
    return res.status(500).send("No se pudo obtener la configuración remota");
  }

  const user = JSON.parse(remoteConfig.user); //users.find((u) => u.username === req.body.username);
  if (!user) {
    return res.status(400).send("No se puede encontrar el usuario");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const role = remoteConfig.role || "user"; // Asignar un rol por defecto si no se encuentra en la configuración remota
      
      const accessToken = jwt.sign(
        { username: user.username, role: role },
        process.env.JWT_SECRET || remoteConfig.secretKey, // Usar la clave secreta del entorno o de la configuración remota
        { expiresIn: "1h" }
      );
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).send("Contraseña incorrecta");
    }
  } catch {
    res.status(500).send(error.stack);
  }
});

module.exports = router;
