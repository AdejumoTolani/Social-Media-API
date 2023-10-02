const jwt = require('jsonwebtoken')
const User = require('../Models/User');
const { Socket } = require('socket.io');




const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.mySecret, async (err, reToken) => {
      if (err) {
        res.status(400).json({ error: "Invalid JWT token" }); 
        // Send an error response and return here
      } else {
        try {
          const user = await User.findById(reToken.id);
          req.user = user
          // socket.user = user
          next(); // Proceed to the next middleware or route handler
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Server error" }); // Handle database query error
        }
      }
    });
  } else {
    res.status(400).json({ error: "Missing JWT token" }); // Send an error response for missing token
  }
};

module.exports = { checkUser }