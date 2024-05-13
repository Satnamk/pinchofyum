const Menu = require("../models/menuModel");

// Render Controller: Render index.html with menus using EJS
const renderMenus = async (req, res) => {
  const user_id = req.user._id
  try {
    const menus = await Menu.find({user_id}).sort({createdAt: -1});
    res.render("menu", { menus }); // Render index.ejs with menus data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Menu by ID
const renderMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const menu = await Menu.findById(id).where('user_id').equals(user_id);
    if (!menu) {
      return res.render("notfound");
    }
    res.render("singlemenu", { menu }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Menu:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addmenu"); // Assuming "addmenu.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new menu (used for rendering and API)
const addMenu = async (req, res) => {
  try {
    const { title, ingredients , price } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newMenu = new Menu({ title, ingredients , price, user_id });
    await newMenu.save();
    // Redirect to the main page after successfully adding the menu
    console.log("Menu added successfully");
    res.redirect("/menu"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).render("error");
  }
};

// Delete Menu by ID
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const menu = await Menu.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!menu) {
      return res.status(404).render("notfound");
    }
    console.log("Menu delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Menu:", error);
    res.status(500).render("error");
  }
};


// Update Menu by ID
const renderUpdateMenu = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the menu by id
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.render("notfound");
    }

    // Render the singlemenu.ejs template with the menu data
    res.render("updatemenu", { menu });

  } catch (error) {
    console.error("Error fetching Menu:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the menu
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { title, ingredients , price } = req.body;
    const updatedMenuData = { title, ingredients , price };

    // Update the menu with the new data
    const updatedMenu = await Menu.findOneAndUpdate({ _id: id, user_id: user_id }, updatedMenuData, { new: true });

    if (!updatedMenu) {
      return res.render("notfound");
    }

    // console.log("Menu updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Menu:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderMenus,
  renderMenu,
  addMenu,
  renderForm,
  deleteMenu,
  updateMenu,
  renderUpdateMenu,
};
