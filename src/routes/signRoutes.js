const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Mock de base de datos de usuarios (reemplazar con una base de datos real)
let users = [];

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send("Usuario registrado");
  } catch {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const user = users.find((u) => u.username === req.body.username);
  if (user == null) {
    return res.status(400).send("No se puede encontrar el usuario");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let role = "";
      if (user.username === keys.SYS_USER) {
        role = keys.SYS_ROLE;
      }
      const accessToken = jwt.sign(
        { username: user.username, role: role },
        keys.SECRET_KEY,
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
