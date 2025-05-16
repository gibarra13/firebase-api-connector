const { db } = require("../config/firebase");

// Crear un nuevo vehículo
const createVehicle = async (userId, vehicleId, vehicle) => {
  const vehiclesRef = db.ref(`users/${userId}/vehicles`);
  await vehiclesRef.child(vehicleId).set(vehicle);
  return vehicle;
};

// Obtener todos los vehículos de un usuario
const getVehicles = async (userId) => {
  const vehiclesRef = db.ref(`users/${userId}/vehicles`);
  const snapshot = await vehiclesRef.once("value");
  return snapshot.val();
};

// Obtener un vehículo específico
const getVehicle = async (userId, vehicleId) => {
  const vehicleRef = db.ref(`users/${userId}/vehicles/${vehicleId}`);
  const snapshot = await vehicleRef.once("value");
  return snapshot.val();
};

// Actualiza un vehículo específico
const patchVehicle = async (userId, vehicleId, vehicleProp) => {
  const vehicleRef = db.ref(`users/${userId}/vehicles/${vehicleId}`);
  await vehicleRef.update(vehicleProp);
  return { message: `Vehicle ${vehicleId} updated` };
};

// Actualiza el location de un vehículo específico 
const patchVehicleLocation = async (userId, vehicleId, locationProp) => {
  const vehicleRef = db.ref(`users/${userId}/vehicles/${vehicleId}/location`);
  await vehicleRef.update(locationProp);
  return { message: `Vehicle ${vehicleId} location updated` };
};

// Actualiza el location de un vehículo específico 
const putVehicleLocation = async (userId, vehicleId, location) => {
  const vehicleRef = db.ref(`users/${userId}/vehicles/${vehicleId}`);
  await vehicleRef.update({ location });
  return { message: `Vehicle ${vehicleId} location updated` };
};

module.exports = { createVehicle, getVehicles, getVehicle, patchVehicle, putVehicleLocation, patchVehicleLocation };