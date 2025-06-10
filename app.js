// Required Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

const app = express();

// MongoDB Connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/abn";

// MongoDB Connection Function
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// View Engine Setup
app.engine("ejs", ejsMate); // Enables layouts with ejs-mate
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Setup
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(methodOverride("_method")); // Enables PUT/DELETE using query param ?_method=
app.use(express.static(path.join(__dirname, "public"))); // Serves static files (CSS, images, etc.)

// Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Joi Validation Middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body); // Validates listing data from form
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg); // Throw validation error
  } else {
    next();
  }
};

/* ---------------- LISTING ROUTES ---------------- */

// INDEX Route - Show all listings
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// NEW Route - Show form to create a new listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE Route - Add new listing to database
app.post("/listings", validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

// SHOW Route - Show specific listing by ID
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

// EDIT Route - Show form to edit a listing
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

// UPDATE Route - Apply edits to a listing
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// DELETE Route - Remove listing from database
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted listing:", deletedListing);
  res.redirect("/listings");
}));

// Catch-all Route for Undefined Paths
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// Start the Server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
