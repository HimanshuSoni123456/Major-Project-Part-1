// Import Mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Import initial data to populate the database
const initData = require("./data.js");

// Import the Mongoose model for 'Listing'
const Listing = require("../models/listing.js");

// MongoDB connection string (local instance)
const MONGO_URL = "mongodb://127.0.0.1:27017/abn";

// Connect to the MongoDB database
main().then(() => {
  console.log("connected to DB");
}).catch((err) => {
  console.log(err);
});

// Async function to establish the connection
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Function to initialize the database with sample data
const initDB = async () => {
  await Listing.deleteMany({}); // Remove all existing listings
  await Listing.insertMany(initData.data); // Insert initial data
  console.log("data was initialized");
};

// Call the initialization function
initDB();
