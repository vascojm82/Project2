const express = require('express');
const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const firebase = require('firebase-admin');
const serviceAccount = require("../env/firebaseServiceAccountKey.json");

// Initialize Firebase
const db_init = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://project2-231a9.firebaseio.com"
});
let db = new FirebaseStore({
  database: db_init.database()
});
module.exports = {
  db
}
