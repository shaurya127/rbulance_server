const admin = require("firebase-admin");

const serviceAccount = require("./firebase_confidentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://r-ambulance.firebaseio.com"
});

module.exports.admin=admin;