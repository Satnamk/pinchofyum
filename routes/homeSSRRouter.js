// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/homeSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with homes using EJS
router.get("/", blogSSR.renderHomes);
// End2: Define a route to render the addhome.ejs view
router.get("/addhome", blogSSR.renderForm);
// End3:Route to add  home using EJ
router.post("/addhome", blogSSR.addHome);
// Define a route to render the singlehome.ejs view
router.get("/single-home/:id", blogSSR.renderHome);
// Define a route to delete singlehome
router.delete("/single-home/:id", blogSSR.deleteHome);
// Define a route to update single home.ejs
router.put("/single-home/:id", blogSSR.updateHome);
// Define home to update
router.get("/single-home/update/:id", blogSSR.renderUpdateHome);

module.exports = router;