const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const errorHandler = require("../errorHandler");
const maxAge = 3 * 24 * 60 * 60;
const { requireAuth} = require('../middleware/authMiddleware')
//create a new jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.mySecret, {
    expiresIn: maxAge,
  });
};

//Register new user
exports.register = async (req, res) => {
  try {
    // if (!req.body.password) {
    //   throw Error("A password is required");
    // }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Generate user using data gotten from request
    const newUser = new User({
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      password: hashedPassword,
    });
    let user = await newUser.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    const { _id, password, isAdmin, createdAt, updatedAt, ...details } =
      user._doc;

    res.status(201).json({user:user.username});
  } catch (err) {
    // console.log(err)
    const errors = errorHandler.handleError(err);
    res.status(400).json({error:errors});
  }
};
//Login registered user
exports.login = async (req, res) => {
  try {
    //Find user in database
    const user = await User.findOne({ username: req.body.username });
    //Tell user if the username doesn't exist
    if (!user) {
      return res.status(404).json({ error: "Invalid username." });
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //Check if password is correct for the valid user
    if (!correctPassword) {
      return res.status(400).json("Username password mismatch.");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // const { _id, password,isAdmin,createdAt, updatedAt, ...details } = user._doc
    
    res.status(200).json({user:user.username});
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
};


exports.logout = async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.status(400).json({error:'logged out'});
};
