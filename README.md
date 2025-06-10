# Major-project-part-1
🧭 Wanderlust: Vacation Rental Web App (Part 1)
A full-stack web application to browse, create, update, and delete vacation rental listings.
📌 Project Highlights
CRUD Functionality:- Implemented full Create, Read, Update, Delete operations for rental listings using RESTful routes.
Tech Stack:-
Frontend:- HTML, CSS, Bootstrap 5, EJS templating
Backend:- Node.js, Express.js, MongoDB, Mongoose
Validation:- Server-side schema validation with Joi
Templating & Layouts: Used ejs-mate to create dynamic layouts and reduce code repetition.

Form Validation:-
Custom client-side validation using Bootstrap
Robust server-side validation using Joi schemas to handle bad input

Error Handling:-
Centralized error management using custom ExpressError class
Catch-all route for handling undefined paths with a custom error page

UI Components:-
Responsive navbar and footer using Bootstrap
Listing display cards with image, title, price, location
Separate pages for Create, Edit, and Show views

Routing:-
Clean RESTful routes for all core features
Method override to support PUT and DELETE requests via forms

Directory Structure:-
MVC-based separation: routes, views, models, utilities, public assets

MongoDB Integration:-
Listings stored with fields: title, description, price, location, country, and image object


📂 Key Features Built in Part 1
📄 Listing index, create, edit, and detail views
🖼️ Image URL support (with plans for file uploads in Part 2)
✅ Form validation and feedback
🛑 Comprehensive error handling
🔗 Reusable layout with partials for navbar and footer
