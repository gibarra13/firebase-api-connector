var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./ivan-drive-firebase-adminsdk-o379n-a67f31685f.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://ivan-drive.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
module.exports = { admin, db };