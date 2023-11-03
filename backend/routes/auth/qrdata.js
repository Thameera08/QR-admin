const express = require("express");
const router = express.Router();
const authVerify = require("./authVerify");
module.exports = (db, collectionName) => {
  router.get("/products", authVerify, async (req, res) => {
    try {
      const startDate = req.query.startDate; // Get the start date from query parameter
      const endDate = req.query.endDate; // Get the end date from query parameter
      const productsRef = db.collection(collectionName);

      // Build the query to filter data based on the date range
      let query = productsRef;
      if (startDate && endDate) {
        query = query
          .where("date", ">=", new Date(startDate))
          .where("date", "<=", new Date(endDate));
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        console.log("No products found.");
        return res.status(404).json({ message: "No products found" });
      }

      // Create an object to store the total quantity and note for each qrCodeData
      const dataByQrCodeData = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const qrCodeData = data.qrCodeData;
        const quantity = data.quantity;
        const description = data.description;

        if (!dataByQrCodeData[qrCodeData]) {
          dataByQrCodeData[qrCodeData] = {
            quantity: 0,
            description: description,
          };
        }

        dataByQrCodeData[qrCodeData].quantity += quantity;
      });

      // Convert the data to the desired format
      const response = Object.keys(dataByQrCodeData).map((qrCodeData) => ({
        qrCodeData,
        quantity: dataByQrCodeData[qrCodeData].quantity,
        description: dataByQrCodeData[qrCodeData].description,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting products: ", error);
      res.status(500).json({ error: "Error getting products" });
    }
  });
  return router;
};
