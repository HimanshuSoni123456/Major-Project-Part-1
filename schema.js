// Schema validation using Joi for server-side input checking
const Joi = require('joi');

// Exporting listingSchema to validate listing creation/update
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),         // Title is required (string)
    description: Joi.string().required(),   // Description is required (string)
    location: Joi.string().required(),      // Location is required (string)
    country: Joi.string().required(),       // Country is required (string)
    price: Joi.number().required().min(0),  // Price is required, must be a non-negative number

    // Image is expected to be an object with URL and filename
    image: Joi.object({
      url: Joi.string().allow("", null),    // URL can be empty or null
      filename: Joi.string()                // Filename can be optional
    }).required()                           // Image object itself is required
  }).required()                             // Entire listing object is required
});
