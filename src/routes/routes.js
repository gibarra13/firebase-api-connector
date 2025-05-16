const express = require("express");
const { createDbUser, getDbUser, deleteDbUser, patchDbUser } = require("../controllers/userDbController");
const { createVehicle, getVehicles, getVehicle, patchVehicle, putVehicleLocation, patchVehicleLocation } = require("../controllers/vehicleDbController");
const { createUserAuth, getUserAuth, deleteUserAuth, getUserAuthByEmail, updateUserAuthDisplayName, listAllUsers } = require("../controllers/userAuthController");


const router = express.Router();

// Rutas de usuarios
router.post("/api/users", async (req, res) => {
  try {
    const serializedUser = Object.entries(req.body).map(([key, value]) => ({
        id: key,
        user: value
    }));
    const result = await createDbUser(serializedUser[0].id, serializedUser[0].user);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await getDbUser(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    const result = await deleteDbUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/api/users/:id", async (req, res) => {
  try {
    const result = await patchDbUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Rutas de vehículos
router.post("/api/users/:id/vehicles", async (req, res) => {
  try {
    const serializedUser = Object.entries(req.body).map(([key, value]) => ({
        id: key,
        vehicle: value
    }));
    const { id: vehicleId, ...vehicle } = req.body;
    const result = await createVehicle(req.params.id, serializedUser[0].id, serializedUser[0].vehicle);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/users/:id/vehicles", async (req, res) => {
  try {
    const vehicles = await getVehicles(req.params.id);
    if (!vehicles) return res.status(404).send("Vehicles not found");
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/users/:id/vehicles/:vid", async (req, res) => {
  try {
    const vehicle = await getVehicle(req.params.id, req.params.vid);
    if (!vehicle) return res.status(404).send("Vehicle not found");
    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/api/users/:id/vehicles/:vid/location", async (req, res) => {
  try {
    const { location } = req.body;
    const result = await putVehicleLocation(req.params.id, req.params.vid, location);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating vehicle location:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/api/users/:id/vehicles/:vid", async (req, res) => {
  try {
    const result = await patchVehicle(req.params.id, req.params.vid, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/api/users/:id/vehicles/:vid/location", async (req, res) => {
  try {
    const result = await patchVehicleLocation(req.params.id, req.params.vid, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating vehicle location:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Rutas de Auth de usuarios
router.post("/api/auth/users", async (req, res) => {
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

router.delete("/api/auth/users/:id", async (req, res) => {
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

router.delete("/api/auth/users/email/:email", async (req, res) => {
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

router.get("/api/auth/users/:id", async (req, res) => {
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

router.get("/api/auth/users/email/:email", async (req, res) => {
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

router.put("/api/auth/users/:id/displayName", async (req, res) => {
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

router.get("/api/auth/users", async (req, res) => {
  try {
    const users = (await listAllUsers()).users;
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;