// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/menuSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with menus using EJS
router.get("/", blogSSR.renderMenus);
// End2: Define a route to render the addmenu.ejs view
router.get("/addmenu", blogSSR.renderForm);
// End3:Route to add  menu using EJ
router.post("/addmenu", blogSSR.addMenu);
// Define a route to render the singlemenu.ejs view
router.get("/single-menu/:id", blogSSR.renderMenu);
// Define a route to delete singlemenu
router.delete("/single-menu/:id", blogSSR.deleteMenu);
// Define a route to update single menu.ejs
router.put("/single-menu/:id", blogSSR.updateMenu);
// Define menu to update
router.get("/single-menu/update/:id", blogSSR.renderUpdateMenu);

module.exports = router;