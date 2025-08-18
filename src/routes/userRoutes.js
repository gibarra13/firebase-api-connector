const express = require("express");
const { createDbUser, getDbUser, getDbUsers, deleteDbUser, patchDbUser, } = require("../controllers/userDbController");
const { createVehicle, getVehicles, getVehicle, patchVehicle, putVehicleLocation, patchVehicleLocation } = require("../controllers/vehicleDbController");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

// Rutas de usuarios
router.post("", authenticateJWT, async (req, res) => {
  try {
    const serializedUser = Object.entries(req.body).map(([key, value]) => ({
      id: key,
      user: value,
    }));
    const result = await createDbUser(
      serializedUser[0].id,
      serializedUser[0].user
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("", authenticateJWT, async (req, res) => {
  try {
    const users = await getDbUsers();
    if (!users) return res.status(404).send("User not found");
    res.json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await getDbUser(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const result = await deleteDbUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/:id", authenticateJWT, async (req, res) => {
  try {
    const result = await patchDbUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Rutas de vehículos
router.post("/:id/vehicles", authenticateJWT, async (req, res) => {
  try {
    const serializedUser = Object.entries(req.body).map(([key, value]) => ({
      id: key,
      vehicle: value,
    }));
    const { id: vehicleId, ...vehicle } = req.body;
    const result = await createVehicle(
      req.params.id,
      serializedUser[0].id,
      serializedUser[0].vehicle
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/vehicles", authenticateJWT, async (req, res) => {
  try {
    const vehicles = await getVehicles(req.params.id);
    if (!vehicles) return res.status(404).send("Vehicles not found");
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/vehicles/:vid", authenticateJWT, async (req, res) => {
  try {
    const vehicle = await getVehicle(req.params.id, req.params.vid);
    if (!vehicle) return res.status(404).send("Vehicle not found");
    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id/vehicles/:vid/location", authenticateJWT, async (req, res) => {
  try {
    const { location } = req.body;
    const result = await putVehicleLocation(
      req.params.id,
      req.params.vid,
      location
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating vehicle location:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/:id/vehicles/:vid", authenticateJWT, async (req, res) => {
  try {
    const result = await patchVehicle(req.params.id, req.params.vid, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/:id/vehicles/:vid/location", authenticateJWT, async (req, res) => {
    try {
      const result = await patchVehicleLocation(
        req.params.id,
        req.params.vid,
        req.body
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating vehicle location:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
