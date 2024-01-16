// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// router.get("/resume/:file", (req, res) => {
//   const address = path.join(__dirname, `../public/resume/${req.params.file}`);
//   fs.access(address, fs.F_OK, (err) => {
//     if (err) {
//       res.status(404).json({
//         message: "File not found",
//       });
//       return;
//     }
//     res.sendFile(address);
//   });
// });

// router.get("/profile/:file", (req, res) => {
//   const address = path.join(__dirname, `../public/profile/${req.params.file}`);
//   fs.access(address, fs.F_OK, (err) => {
//     if (err) {
//       res.status(404).json({
//         message: "File not found",
//       });
//       return;
//     }
//     res.sendFile(address);
//   });
// });

// module.exports = router;

const express = require("express"); // Importing the Express.js framework
const fs = require("fs"); // Node.js module for interacting with the file system
const path = require("path"); // Node.js module for working with file and directory paths

const router = express.Router(); // Creating an instance of an Express Router

router.get("/resume/:file", (req, res) => {
  // Handling a GET request to retrieve a resume file
  const address = path.join(__dirname, `../public/resume/${req.params.file}`);
  // Constructing the file path using the current directory and the requested file name

  fs.access(address, fs.F_OK, (err) => {
    // Checking if the file exists
    if (err) {
      // If the file doesn't exist, send a 404 response with a JSON message
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    // If the file exists, send the file as a response
    res.sendFile(address);
  });
});

router.get("/profile/:file", (req, res) => {
  // Handling a GET request to retrieve a profile file
  const address = path.join(__dirname, `../public/profile/${req.params.file}`);
  // Constructing the file path using the current directory and the requested file name

  fs.access(address, fs.F_OK, (err) => {
    // Checking if the file exists
    if (err) {
      // If the file doesn't exist, send a 404 response with a JSON message
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    // If the file exists, send the file as a response
    res.sendFile(address);
  });
});

module.exports = router; // Exporting the router for use in other parts of the application
