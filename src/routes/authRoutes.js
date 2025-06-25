const express = require("express");
const { createUserAuth, getUserAuth, deleteUserAuth, getUserAuthByEmail, updateUserAuthDisplayName, listAllUsers } = require("../controllers/userAuthController");
const authenticateJWT = require("../middleware/authenticateJWT")

const router = express.Router();

//Rutas de Auth de usuarios
router.post("/users", authenticateJWT, async (req, res) => {
  try {
    const result = await createUserAuth(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).send("Email already exists");
    }
    if (error.code === 'auth/invalid-email') {
      return res.status(400).send("Invalid email format");
    }
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/:id", authenticateJWT, async (req, res) => {
  try {
    const result = await deleteUserAuth(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.code === 'auth/user-not-found') {
      return res.status(404).send("User not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/email/:email", authenticateJWT, async (req, res) => {
  try {
    const user = await getUserAuthByEmail(req.params.email);
    if (!user) return res.status(404).send("User not found");
    const result = await deleteUserAuth(user.uid);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.code === 'auth/user-not-found') {
      return res.status(404).send("User not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/users/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await getUserAuth(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error.code === 'auth/user-not-found') {
      return res.status(404).send("User not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});


router.get("/users/email/:email", authenticateJWT, async (req, res) => {
  try {
    const user = await getUserAuthByEmail(req.params.email);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error.code === 'auth/user-not-found') {
      return res.status(404).send("User not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/users/:id/displayName", authenticateJWT, async (req, res) => {
  try {
    const { displayName } = req.body;
    const result = await updateUserAuthDisplayName(req.params.id, displayName);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.code === 'auth/user-not-found') {
      return res.status(404).send("User not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/users", authenticateJWT, async (req, res) => {
  try {
    const users = (await listAllUsers()).users;
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;