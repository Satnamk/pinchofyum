const Specialdish = require("../models/specialdishModel");

// Render Controller: Render index.html with specialdishs using EJS
const renderSpecialdishs = async (req, res) => {
  const user_id = req.user._id
  try {
    const specialdishs = await Specialdish.find({user_id}).sort({createdAt: -1});
    res.render("special-dishes", { specialdishs }); // Render special-dishes.ejs with specialdishs data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};



// Get Specialdish by ID
const renderSpecialdish = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const specialdish = await Specialdish.findById(id).where('user_id').equals(user_id);
    if (!specialdish) {
      return res.render("notfound");
    }
    res.render("singlespecialdish", { specialdish }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Specialdish:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addspecialdish"); // Assuming "addspecialdish.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new specialdish (used for rendering and API)
const addSpecialdish = async (req, res) => {
  try {
    const { title, subtitle, content, button, price } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newSpecialdish = new Specialdish({ title, subtitle, content, button, price, user_id });
    await newSpecialdish.save();
    // Redirect to the main page after successfully adding the specialdish
    console.log("Specialdish added successfully");
    res.redirect("/special-dishes"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding specialdish:", error);
    res.status(500).render("error");
  }
};

// Delete Specialdish by ID
const deleteSpecialdish = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const specialdish = await Specialdish.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!specialdish) {
      return res.status(404).render("notfound");
    }
    console.log("Specialdish delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Specialdish:", error);
    res.status(500).render("error");
  }
};


// Update Specialdish by ID
const renderUpdateSpecialdish = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the specialdish by id
    const specialdish = await Specialdish.findById(id);

    if (!specialdish) {
      return res.render("notfound");
    }

    // Render the singlespecialdish.ejs template with the specialdish data
    res.render("updatespecialdish", { specialdish });

  } catch (error) {
    console.error("Error fetching Specialdish:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the specialdish
const updateSpecialdish = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { title, subtitle, content, button, price } = req.body;
    const updatedSpecialdishData = { title, subtitle, content, button, price };

    // Update the specialdish with the new data
    const updatedSpecialdish = await Specialdish.findOneAndUpdate({ _id: id, user_id: user_id }, updatedSpecialdishData, { new: true });

    if (!updatedSpecialdish) {
      return res.render("notfound");
    }

    // console.log("Specialdish updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Specialdish:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderSpecialdishs,
  renderSpecialdish,
  addSpecialdish,
  renderForm,
  deleteSpecialdish,
  updateSpecialdish,
  renderUpdateSpecialdish,
};
