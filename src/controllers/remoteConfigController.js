const admin = require("firebase-admin");

// Asegúrate de inicializar Firebase Admin antes de usarlo
// admin.initializeApp({ ... });

async function getRemoteConfigProperties() {
  try {
    const remoteConfig = await admin.remoteConfig().getTemplate();
    const parameters = remoteConfig.parameters || {};
    return parameters;
  } catch (error) {
    return { error: error.message };
  }
}

async function getRemoteConfigPropertiesByKey(key) {
  try {
    const remoteConfig = await admin.remoteConfig().getTemplate();
    const parameters = remoteConfig.parameters || {};
    return parameters[key] || null;
  } catch (error) {
    return { error: error.message };
  }
}

async function getRemoteConfigPropertiesForLogin() {
  try {
    const remoteConfig = await admin.remoteConfig().getTemplate();
    const parameters = remoteConfig.parameters || {};
    const user = {
      user: parameters["connector_sys_user"].defaultValue.value || null,
      role: parameters["connector_sys_role"].defaultValue.value || null,
      secretKey: parameters["connector_key"].defaultValue.value || null,
    };
    return user;
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  getRemoteConfigProperties,
  getRemoteConfigPropertiesByKey,
  getRemoteConfigPropertiesForLogin,
};
