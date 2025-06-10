// Import mongoose to define the schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a listing
const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  description: String, // Optional description
  image: {
    filename: {
      type: String,
      default: "defaultImage", // Default filename if none is provided
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          : v, // Use default URL if empty string is provided
    },
  },
  price: Number,     // Price of the listing
  location: String,  // Location name
  country: String,   // Country name
});

// Create a model from the schema
const Listing = mongoose.model("Listing", listingSchema);

// Export the model to use in other parts of the app
module.exports = Listing;
