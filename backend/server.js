// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passportConfig = require("./lib/passportConfig");
// const cors = require("cors");
// const fs = require("fs");
// require("dotenv").config();

// // MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://avigoyal0453:abcd@cluster0.gz9mtum.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then((res) => console.log("Connected to DB"))
//   .catch((err) => console.log(err));

// // initialising directories
// if (!fs.existsSync("./public")) {
//   fs.mkdirSync("./public");
// }
// if (!fs.existsSync("./public/resume")) {
//   fs.mkdirSync("./public/resume");
// }
// if (!fs.existsSync("./public/profile")) {
//   fs.mkdirSync("./public/profile");
// }

// const app = express();
// const port = 4444;

// app.use(bodyParser.json({ limit: "10mb" })); // support json encoded bodies
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // support encoded bodies

// // Setting up middlewares
// app.use(cors());
// app.use(express.json());
// app.use(passportConfig.initialize());

// // Routing
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));
// app.use("/upload", require("./routes/uploadRoutes"));
// app.use("/host", require("./routes/downloadRoutes"));

// app.listen(port, () => {
//   console.log(`Server started on port ${port}!`);
// });

// Importing required modules
const express = require("express"); // Importing the Express.js framework
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const mongoose = require("mongoose"); // MongoDB object modeling tool
const passportConfig = require("./lib/passportConfig"); // Custom Passport configuration
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const fs = require("fs"); // Node.js module for interacting with the file system
require("dotenv").config(); // Loads environment variables from a .env file

// Connecting to MongoDB
mongoose
  .connect(
    "mongodb+srv://avigoyal0453:abcd@cluster0.gz9mtum.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((res) => console.log("Connected to DB")) // Log if the connection is successful
  .catch((err) => console.log(err)); // Log any error that occurs during connection

// Initializing directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public"); // Create the "public" directory if it doesn't exist
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume"); // Create the "public/resume" directory if it doesn't exist
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile"); // Create the "public/profile" directory if it doesn't exist
}

// Creating an Express application
const app = express(); // Create an Express application
const port = 4444; // Define the port for the server to listen on

// Setting up middlewares
app.use(bodyParser.json({ limit: "10mb" })); // Use bodyParser middleware for parsing JSON-encoded request bodies with a size limit of 10mb
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Use bodyParser middleware for parsing URL-encoded request bodies with a size limit of 10mb and extended mode

app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(passportConfig.initialize()); // Initialize Passport middleware for authentication

// Routing
app.use("/auth", require("./routes/authRoutes")); // Use the authRoutes for paths starting with "/auth"
app.use("/api", require("./routes/apiRoutes")); // Use the apiRoutes for paths starting with "/api"
app.use("/upload", require("./routes/uploadRoutes")); // Use the uploadRoutes for paths starting with "/upload"
app.use("/host", require("./routes/downloadRoutes")); // Use the downloadRoutes for paths starting with "/host"

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}!`); // Log a message when the server starts
});
