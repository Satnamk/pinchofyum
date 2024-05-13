// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/aboutSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with abouts using EJS
router.get("/", blogSSR.renderAbouts);
// End2: Define a route to render the addabout.ejs view
router.get("/addabout", blogSSR.renderForm);
// End3:Route to add  about using EJ
router.post("/addabout", blogSSR.addAbout);
// Define a route to render the singleabout.ejs view
router.get("/single-about/:id", blogSSR.renderAbout);
// Define a route to delete singleabout
router.delete("/single-about/:id", blogSSR.deleteAbout);
// Define a route to update single about.ejs
router.put("/single-about/:id", blogSSR.updateAbout);
// Define about to update
router.get("/single-about/update/:id", blogSSR.renderUpdateAbout);

module.exports = router;