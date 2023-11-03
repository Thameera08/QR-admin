const express = require("express");
const router = express.Router();
const authVerify = require("./authVerify");

module.exports = (db, collectionName) => {
  // Add a POST route for retrieving data based on qrCodeData
  router.get("/qritemdata", authVerify, async (req, res) => {
    try {
      const qrCodeData = req.query.qrCodeData; // Get the qrCodeData from the request body

      if (!qrCodeData) {
        return res
          .status(400)
          .json({ message: "Missing qrCodeData in the request body" });
      }

      const productsRef = db.collection(collectionName);

      // Query the database for documents that match the qrCodeData
      const snapshot = await productsRef
        .where("qrCodeData", "==", qrCodeData)
        .get();
      console.log(
        "Firestore query result: ",
        snapshot.docs.map((doc) => doc.data())
      );

      if (snapshot.empty) {
        console.log(`No products found for qrCodeData: ${qrCodeData}`);
        return res
          .status(404)
          .json({ message: `No products found for qrCodeData: ${qrCodeData}` });
      }

      // Prepare the response data
      const responseData = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const responseDataItem = {
          qrCodeData: data.qrCodeData,
          description: data.description,
        };

        if (data.date) {
          // Convert Firestore timestamp to JavaScript Date object
          const timestamp = data.date;
          const date = new Date(
            timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
          );

          responseDataItem.date = date;
        }

        if (data.quantity !== null) {
          responseDataItem.quantity = data.quantity;
        }

        if (data.note !== null) {
          responseDataItem.note = data.note;
        }

        // Only add the item to the response if it has either a note or quantity
        if (
          responseDataItem.quantity !== undefined ||
          responseDataItem.note !== undefined
        ) {
          responseData.push(responseDataItem);
        }
      });

      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error getting product data: ", error);
      res.status(500).json({ error: "Error getting product data" });
    }
  });

  return router;
};
