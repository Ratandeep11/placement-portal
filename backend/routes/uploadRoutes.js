// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");

// const pipeline = promisify(require("stream").pipeline);

// const router = express.Router();

// const upload = multer();

// router.post("/resume", upload.single("file"), (req, res) => {
//   const { file } = req;
//   if (!["application/pdf"].includes(file.mimetype)) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.mimetype.replace("application/", ".")}`;
//     pipeline(
//       `${file.buffer}`,
//       fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "File uploaded successfully",
//           url: `/host/resume/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });

// router.post("/profile", upload.single("file"), (req, res) => {
//   const { file } = req;
//   if (!["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.mimetype.replace("image/", ".")}`;
//     pipeline(
//       `${file.buffer}`,
//       fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "Profile image uploaded successfully",
//           url: `/host/profile/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });

// module.exports = router;
const express = require("express"); // Importing the Express.js framework
const multer = require("multer"); // Middleware for handling `multipart/form-data`, used for file uploads
const fs = require("fs"); // Node.js module for interacting with the file system
const { v4: uuidv4 } = require("uuid"); // Library for generating UUIDs
const { promisify } = require("util"); // Node.js utility module for working with asynchronous functions

const pipeline = promisify(require("stream").pipeline); // Promisifying the pipeline function for working with streams asynchronously

const router = express.Router(); // Creating an instance of an Express Router

const upload = multer(); // Creating a multer instance for handling file uploads

router.post("/resume", upload.single("file"), (req, res) => {
  // Handling a POST request to upload a resume file
  const { file } = req;

  if (!["application/pdf"].includes(file.mimetype)) {
    // Checking if the file type is not a PDF
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.mimetype.replace("application/", ".")}`;
    // Generating a unique filename using UUID and replacing 'application/' with '.'

    pipeline(
      `${file.buffer}`, // Creating a readable stream from the file buffer
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`) // Creating a writable stream to save the file
    )
      .then(() => {
        res.send({
          message: "File uploaded successfully",
          url: `/host/resume/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});

router.post("/profile", upload.single("file"), (req, res) => {
  // Handling a POST request to upload a profile image
  const { file } = req;

  if (!["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
    // Checking if the file type is not an image (JPG, PNG, JPEG)
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.mimetype.replace("image/", ".")}`;
    // Generating a unique filename using UUID and replacing 'image/' with '.'

    pipeline(
      `${file.buffer}`, // Creating a readable stream from the file buffer
      fs.createWriteStream(`${__dirname}/../public/profile/${filename}`) // Creating a writable stream to save the file
    )
      .then(() => {
        res.send({
          message: "Profile image uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});

module.exports = router; // Exporting the router for use in other parts of the application
