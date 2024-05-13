const Reservation = require("../models/reservationModel");

// Render Controller: Render index.html with reservations using EJS
const renderReservations = async (req, res) => {
  const user_id = req.user._id
  try {
    const reservations = await Reservation.find({user_id}).sort({createdAt: -1});
    res.render("reservation", { reservations }); // Render index.ejs with reservations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Reservation by ID
const renderReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const reservation = await Reservation.findById(id).where('user_id').equals(user_id);
    if (!reservation) {
      return res.render("notfound");
    }
    res.render("singlereservation", { reservation }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Reservation:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addreservation"); // Assuming "addreservation.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new reservation (used for rendering and API)
const addReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, person, message  } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newReservation = new Reservation({ name, email, phone, date, time, person, message  });
    await newReservation.save();
    // Redirect to the main page after successfully adding the reservation
    console.log("Reservation added successfully");
    res.redirect("/reservation"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).render("error");
  }
};

// Delete Reservation by ID
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const reservation = await Reservation.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!reservation) {
      return res.status(404).render("notfound");
    }
    console.log("Reservation delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Reservation:", error);
    res.status(500).render("error");
  }
};

// Update Reservation by ID
const renderUpdateReservation = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the reservation by id
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.render("notfound");
    }

    // Render the singlereservation.ejs template with the reservation data
    res.render("updatereservation", { reservation });

  } catch (error) {
    console.error("Error fetching Reservation:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    //const achieved = req.body.achieved === "on";
    const { name, email, phone, date, time, person, message  } = req.body;
    const user_id = req.user._id;
    const updatedReservationData = { name, email, phone, date, time, person, message  };

    // Update the reservation with the new data
    const updatedReservation = await Reservation.findOneAndUpdate({ _id: id, user_id: user_id }, updatedReservationData, { new: true });

    if (!updatedReservation) {
      return res.render("notfound");
    }

    // console.log("Reservation updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Reservation:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderReservations,
  renderReservation,
  addReservation,
  renderForm,
  deleteReservation,
  updateReservation,
  renderUpdateReservation,
};


