const express = require("express");
const app = express();
const port = 4003;
const cors = require("cors"); // Import the cors middleware

app.use(express.json());

// Initialize Firebase Admin SDK and Firestore connection
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const collectionName = "products";
const logincollection = "users";

// Require the qrdata module and pass the db and collectionName variables
const qrproduct = require("./routes/auth/qrdata")(db, collectionName);
const login = require("./routes/auth/login")(db, logincollection);
const qritemdata = require("./routes/auth/qritemdata")(db, collectionName); // Import qritemdata module

// Add CORS middleware before your routes
app.use(cors());

app.use("/api/dashboard", qrproduct);
app.use("/api/dashboard", login);
app.use("/api/dashboard", qritemdata); // Add the qritemdata module
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
