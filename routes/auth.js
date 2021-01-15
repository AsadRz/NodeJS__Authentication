const router = require("express").Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");
var bcrypt = require("bcryptjs"); //Password Hashing

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

// router.post("/login", (req, res) => {});

module.exports = router;
