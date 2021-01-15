const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs"); //Password Hashing
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  /**
   * Validate User before forwading
   */

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if Email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists");

  // Hashing the Password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  /**
   * Creating new User
   */
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  /**
   * Validate User before forwading
   */

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if Email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email or Password");

  //Checking if password is correct
  const ValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!ValidPass) return res.status(400).send("Invalid Email or Password");

  //Creating and assigning a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
