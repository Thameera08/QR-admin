const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt
require("dotenv").config();

module.exports = (db, collectionName) => {
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      // Query the Firestore collection to find a user with the provided username
      const usersRef = db.collection(collectionName);
      const userQuery = await usersRef.where("username", "==", username).get();

      if (userQuery.empty) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = userQuery.docs[0].data();
      const hashedPassword = user.password; // Assuming the stored password is the hashed password

      // Compare the provided password with the hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Successful login
        const token = jwt.sign(
          { _id: user.password },
          process.env.TOKEN_SECRET
        );
        res.status(200).json({ token });
      } else {
        // Passwords do not match
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error: ", error);
      res.status(500).json({ error: "Login error" });
    }
  });

  return router;
};
