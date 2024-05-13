const express = require("express");

const multer = require('multer');
const path = require('path');

const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const userSSRRoutes = require("./routes/userSSRRouter");
const homeSSRRouter = require("./routes/homeSSRRouter");
const imageSSRRouter = require("./routes/imageSSRRouter");
const specialdishSSRRouter = require("./routes/specialdishSSRRouter");
const aboutSSRRouter = require("./routes/aboutSSRRouter");
const menuSSRRouter = require("./routes/menuSSRRouter");
const reservationSSRRouter = require("./routes/reservationSSRRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Middleware to parse cookies
app.use(cookieParser());

app.use(logger);

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

app.use("/", homeSSRRouter);
app.use("/", imageSSRRouter);
app.use("/special-dishes", specialdishSSRRouter);
app.use("/about", aboutSSRRouter);
app.use("/menu", menuSSRRouter);
app.use("/reservation", reservationSSRRouter);
app.use("/user", userSSRRoutes);

app.use("/", specialdishSSRRouter);
app.use("/", aboutSSRRouter);
app.use("/", menuSSRRouter);
app.use("/", reservationSSRRouter);

/*************image ************* */
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') // Folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // File name will be original name with timestamp
  }
});

const upload = multer({ storage });

// Handle POST request to /upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
      // File upload successful
      res.json({ message: 'File uploaded successfully' });
  } catch (error) {
      // Error occurred during file upload
      res.status(500).json({ error: 'Error uploading file' });
  }
});


/********************************* */

// Define route for the /about URL
app.get('/about', (req, res) => {
  // Render your about.ejs template here
  res.render('about'); // Assuming 'about.ejs' is your template file for the About page
});
app.get('/special-dishes', (req, res) => {
  // Render your special-dishes.ejs template here
  res.render('special-dishes'); // Assuming 'special-dishes.ejs' is your template file for the Special-dishes page
});
app.get('/menu', (req, res) => {
  // Render your menu.ejs template here
  res.render('menu'); // Assuming 'menu.ejs' is your template file for the Menu page
});
app.get('/team', (req, res) => {
  // Render your team.ejs template here
  res.render('team'); // Assuming 'team.ejs' is your template file for the Team page
});
app.get('/reservation', (req, res) => {
  // Render your reservation.ejs template here
  res.render('reservation'); // Assuming 'reservation.ejs' is your template file for the Reservation page
});

app.get('/dashboard', (req, res) => {
  // Render your reservation.ejs template here
  res.render('dashboard'); // Assuming 'reservation.ejs' is your template file for the Reservation page
});

// Route to fetch data for addhome
app.get('/fetchAddHomeData', async (req, res) => {
  const user_id = req.user._id;
  try {
    const homes = await Home.find({ user_id }).sort({ createdAt: -1 });
    res.json(homes);
  } catch (error) {
    console.error("Error fetching data for addhome:", error);
    res.status(500).json({ error: "Error fetching data for addhome" });
  }
});


const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
