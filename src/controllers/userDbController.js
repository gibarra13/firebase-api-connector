const { db } = require("../config/firebase");

// Crear un nuevo usuario
const createDbUser = async (id, user) => {
  const usersRef = db.ref("users");
  await usersRef.child(id).set(user);
  return user;
};

// Obtener un usuario por ID
const getDbUser = async (id) => {
  const userRef = db.ref(`users/${id}`);
  const snapshot = await userRef.once("value");
  return snapshot.val();
};

// Obtener todos los usuarios
const getDbUsers = async (id) => {
  const usersRef = db.ref(`users`);
  const snapshot = await usersRef.once("value");
  return snapshot.val();
};

// Eliminar un usuario por ID
const deleteDbUser = async (id) => {
  const userRef = db.ref(`users/${id}`);
  await userRef.set(null);
  return { message: `User ${id} deleted` };
};

// Actualizar alguna propiedad de un usuario por ID
const patchDbUser = async (id, userProp) => {
  const userRef = db.ref(`users/${id}`);
  await userRef.update(userProp);
  return { message: `User ${id} updated` };
};

module.exports = { createDbUser, getDbUser, getDbUsers, deleteDbUser, patchDbUser };
// Compare this snippet from src/controllers/userController.js:  