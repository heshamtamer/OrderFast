// backend/index.js
const express = require('express');
const cors = require('cors');
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cron = require("node-cron");
const bodyParser = require("body-parser");
const Order = require("./models/Order"); // Import Order model

// Connect to the database
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // Set this to your frontend origin URL for better security
  methods: ["GET", "POST", "DELETE"]
}));
app.use(express.json()); 
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!'); 
});
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Schedule cron job to delete orders every 12 hours
cron.schedule("0 */12 * * *", async () => {
  try {
    await Order.deleteMany({});
    console.log("Orders collection cleared successfully.");
  } catch (error) {
    console.error("Error deleting orders:", error);
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
