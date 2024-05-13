// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/imageSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with images using EJS
router.get("/", blogSSR.renderImages);
// End2: Define a route to render the addimage.ejs view
router.get("/addimage", blogSSR.renderForm);
// End3:Route to add  image using EJ
router.post("/addimage", blogSSR.addImage);
// Define a route to render the singleimage.ejs view
router.get("/single-image/:id", blogSSR.renderImage);
// Define a route to delete singleimage
router.delete("/single-image/:id", blogSSR.deleteImage);
// Define a route to update single image.ejs
router.put("/single-image/:id", blogSSR.updateImage);
// Define image to update
router.get("/single-image/update/:id", blogSSR.renderUpdateImage);

module.exports = router;