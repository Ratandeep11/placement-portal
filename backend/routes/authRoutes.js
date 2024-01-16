// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const authKeys = require("../lib/authKeys");

// const User = require("../db/User");
// const JobApplicant = require("../db/JobApplicant");
// const Recruiter = require("../db/Recruiter");

// const router = express.Router();

// router.post("/signup", (req, res) => {
//   const data = req.body;
//   let user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   user
//     .save()
//     .then(() => {
//       const userDetails =
//         user.type == "recruiter"
//           ? new Recruiter({
//               userId: user._id,
//               name: data.name,
//               contactNumber: data.contactNumber,
//               bio: data.bio,
//             })
//           : new JobApplicant({
//               userId: user._id,
//               name: data.name,
//               education: data.education,
//               skills: data.skills,
//               rating: data.rating,
//               resume: data.resume,
//               profile: data.profile,
//             });

//       userDetails
//         .save()
//         .then(() => {
//           // Token
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             type: user.type,
//           });
//         })
//         .catch((err) => {
//           user
//             .delete()
//             .then(() => {
//               res.status(400).json(err);
//             })
//             .catch((err) => {
//               res.json({ error: err });
//             });
//           err;
//         });
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.post("/login", (req, res, next) => {
//   passport.authenticate(
//     "local",
//     { session: false },
//     function (err, user, info) {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         res.status(401).json(info);
//         return;
//       }
//       // Token
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({
//         token: token,
//         type: user.type,
//       });
//     }
//   )(req, res, next);
// });

// module.exports = router;
const express = require("express"); // Importing the Express.js framework
const passport = require("passport"); // Passport.js for authentication
const jwt = require("jsonwebtoken"); // JSON Web Token (JWT) library for creating and verifying tokens
const authKeys = require("../lib/authKeys"); // Importing authentication keys
const User = require("../db/User"); // Importing the User model
const JobApplicant = require("../db/JobApplicant"); // Importing the JobApplicant model
const Recruiter = require("../db/Recruiter"); // Importing the Recruiter model

const router = express.Router(); // Creating an instance of an Express Router

router.post("/signup", (req, res) => {
  // Handling a POST request to sign up a new user
  const data = req.body; // Extracting request body data

  // Creating a new User instance with email, password, and type
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  // Saving the user to the database
  user
    .save()
    .then(() => {
      // Based on the user type, create and save additional details using the corresponding model
      const userDetails =
        user.type == "recruiter"
          ? new Recruiter({
              userId: user._id,
              name: data.name,
              contactNumber: data.contactNumber,
              bio: data.bio,
            })
          : new JobApplicant({
              userId: user._id,
              name: data.name,
              education: data.education,
              skills: data.skills,
              rating: data.rating,
              resume: data.resume,
              profile: data.profile,
            });

      // Save additional details to the database
      userDetails
        .save()
        .then(() => {
          // Generate a JWT token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          // Send the token and user type in the response
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          // If there is an error in saving additional details, delete the user and send an error response
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      // If there is an error in saving the user, send an error response
      res.status(400).json(err);
    });
});

router.post("/login", (req, res, next) => {
  // Handling a POST request to log in a user
  passport.authenticate(
    "local", // Using the "local" strategy for authentication
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        // If user authentication fails, send an unauthorized (401) response with the authentication info
        res.status(401).json(info);
        return;
      }
      // If authentication is successful, generate a JWT token and send it in the response along with the user type
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router; // Export the router for use in other parts of the application
