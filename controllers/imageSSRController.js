const Image = require("../models/imageModel");

// Render Controller: Render index.html with images using EJS
const renderImages = async (req, res) => {
  const user_id = req.user._id
  try {
    const images = await Image.find({user_id}).sort({createdAt: -1});
    res.render("index", { images }); // Render index.ejs with images data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};



// Get Image by ID
const renderImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const image = await Image.findById(id).where('user_id').equals(user_id);
    if (!image) {
      return res.render("notfound");
    }
    res.render("singleimage", { image }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Image:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addimage"); // Assuming "addimage.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new image (used for rendering and API)
const addImage = async (req, res) => {
  try {
    const { title, photo } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newImage = new Image({ title, photo, user_id });
    await newImage.save();
    // Redirect to the main page after successfully adding the image
    console.log("Image added successfully");
    res.redirect("/dashboard"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).render("error");
  }
};

// Delete Image by ID
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const image = await Image.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!image) {
      return res.status(404).render("notfound");
    }
    console.log("Image delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Image:", error);
    res.status(500).render("error");
  }
};


// Update Image by ID
const renderUpdateImage = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the image by id
    const image = await Image.findById(id);

    if (!image) {
      return res.render("notfound");
    }

    // Render the singleimage.ejs template with the image data
    res.render("updateimage", { image });

  } catch (error) {
    console.error("Error fetching Image:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the image
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { title, photo } = req.body;
    const updatedImageData = { title, photo };

    // Update the image with the new data
    const updatedImage = await Image.findOneAndUpdate({ _id: id, user_id: user_id }, updatedImageData, { new: true });

    if (!updatedImage) {
      return res.render("notfound");
    }

    // console.log("Image updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Image:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderImages,
  renderImage,
  addImage,
  renderForm,
  deleteImage,
  updateImage,
  renderUpdateImage,
};
