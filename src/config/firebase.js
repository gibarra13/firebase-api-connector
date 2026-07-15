const admin = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getDatabase } = require("firebase-admin/database");
const { getRemoteConfig } = require("firebase-admin/remote-config");

// Fetch the service account key JSON file contents
const serviceAccount = require("./ivan-drive-firebase-adminsdk-o379n-a67f31685f.json");

// Initialize the app with a service account, granting admin privileges
if (!admin.getApps().length) {
  admin.initializeApp({
    credential: admin.cert(serviceAccount),
    // The database URL depends on the location of the database
    databaseURL: "https://ivan-drive.firebaseio.com/"
  });
}

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getDatabase();
const rc = getRemoteConfig();
const auth = getAuth();

module.exports = { admin, db, rc, auth };