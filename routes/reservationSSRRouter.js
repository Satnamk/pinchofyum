// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/reservationSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with reservations using EJS
router.get("/", blogSSR.renderReservations);
// End2: Define a route to render the addreservation.ejs view
router.get("/addreservation", blogSSR.renderForm);
// End3:Route to add  reservation using EJ
router.post("/addreservation", blogSSR.addReservation);
// Define a route to render the singlereservation.ejs view
router.get("/single-reservation/:id", blogSSR.renderReservation);
// Define a route to delete singlereservation
router.delete("/single-reservation/:id", blogSSR.deleteReservation);
// Define a route to update single reservation.ejs
router.put("/single-reservation/:id", blogSSR.updateReservation);
// Define reservation to update
router.get("/single-reservation/update/:id", blogSSR.renderUpdateReservation);

module.exports = router;

