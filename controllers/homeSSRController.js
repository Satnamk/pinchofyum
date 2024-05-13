const Home = require("../models/homeModel");

// Render Controller: Render index.html with homes using EJS
const renderHomes = async (req, res) => {
  const user_id = req.user._id
  try {
    const homes = await Home.find({user_id}).sort({createdAt: -1});
    res.render("index", { homes }); // Render index.ejs with homes data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};



// Get Home by ID
const renderHome = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const home = await Home.findById(id).where('user_id').equals(user_id);
    if (!home) {
      return res.render("notfound");
    }
    res.render("singlehome", { home }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Home:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addhome"); // Assuming "addhome.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new home (used for rendering and API)
const addHome = async (req, res) => {
  try {
    const { title, button } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newHome = new Home({ title, button, user_id });
    await newHome.save();
    // Redirect to the main page after successfully adding the home
    console.log("Home added successfully");
    res.redirect("/dashboard"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding home:", error);
    res.status(500).render("error");
  }
};

// Delete Home by ID
const deleteHome = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const home = await Home.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!home) {
      return res.status(404).render("notfound");
    }
    console.log("Home delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Home:", error);
    res.status(500).render("error");
  }
};


// Update Home by ID
const renderUpdateHome = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the home by id
    const home = await Home.findById(id);

    if (!home) {
      return res.render("notfound");
    }

    // Render the singlehome.ejs template with the home data
    res.render("updatehome", { home });

  } catch (error) {
    console.error("Error fetching Home:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the home
const updateHome = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { title, button} = req.body;
    const updatedHomeData = { title, button};

    // Update the home with the new data
    const updatedHome = await Home.findOneAndUpdate({ _id: id, user_id: user_id }, updatedHomeData, { new: true });

    if (!updatedHome) {
      return res.render("notfound");
    }

    // console.log("Home updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Home:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderHomes,
  renderHome,
  addHome,
  renderForm,
  deleteHome,
  updateHome,
  renderUpdateHome,
};
