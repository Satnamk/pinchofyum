// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/specialdishSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with specialdishs using EJS
router.get("/", blogSSR.renderSpecialdishs);
// End2: Define a route to render the addspecialdish.ejs view
router.get("/addspecialdish", blogSSR.renderForm);
// End3:Route to add  specialdish using EJ
router.post("/addspecialdish", blogSSR.addSpecialdish);
// Define a route to render the singlespecialdish.ejs view
router.get("/single-specialdish/:id", blogSSR.renderSpecialdish);
// Define a route to delete singlespecialdish
router.delete("/single-specialdish/:id", blogSSR.deleteSpecialdish);
// Define a route to update single specialdish.ejs
router.put("/single-specialdish/:id", blogSSR.updateSpecialdish);
// Define specialdish to update
router.get("/single-specialdish/update/:id", blogSSR.renderUpdateSpecialdish);

module.exports = router;