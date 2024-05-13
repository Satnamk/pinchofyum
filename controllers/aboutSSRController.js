const About = require("../models/aboutModel");

// Render Controller: Render index.html with abouts using EJS
const renderAbouts = async (req, res) => {
  const user_id = req.user._id
  try {
    const abouts = await About.find({user_id}).sort({createdAt: -1});
    res.render("about", { abouts }); // Render index.ejs with abouts data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get About by ID
const renderAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const about = await About.findById(id).where('user_id').equals(user_id);
    if (!about) {
      return res.render("notfound");
    }
    res.render("singleabout", { about }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering About:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addabout"); // Assuming "addabout.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new about (used for rendering and API)
const addAbout = async (req, res) => {
  try {
    const { image, title, subtitle, content, recipes, photos, name } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newAbout = new About({ image, title, subtitle, content, recipes, photos, name, user_id });
    await newAbout.save();
    // Redirect to the main page after successfully adding the about
    console.log("About added successfully");
    res.redirect("/about"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding about:", error);
    res.status(500).render("error");
  }
};

// Delete About by ID
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const about = await About.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!about) {
      return res.status(404).render("notfound");
    }
    console.log("About delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing About:", error);
    res.status(500).render("error");
  }
};


// Update About by ID
const renderUpdateAbout = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the about by id
    const about = await About.findById(id);

    if (!about) {
      return res.render("notfound");
    }

    // Render the singleabout.ejs template with the about data
    res.render("updateabout", { about });

  } catch (error) {
    console.error("Error fetching About:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the about
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { image, title, subtitle, content, recipes, photos, name } = req.body;
    const updatedAboutData = { image, title, subtitle, content, recipes, photos, name };

    // Update the about with the new data
    const updatedAbout = await About.findOneAndUpdate({ _id: id, user_id: user_id }, updatedAboutData, { new: true });

    if (!updatedAbout) {
      return res.render("notfound");
    }

    // console.log("About updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating About:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderAbouts,
  renderAbout,
  addAbout,
  renderForm,
  deleteAbout,
  updateAbout,
  renderUpdateAbout,
};
