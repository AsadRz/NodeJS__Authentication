/**
 * Registration
 */
const {
  registerValidation,
} = require('../../../Validations/User/authValidation');
const {
  emailExistsCheck,
  passwordHashing,
  registerUser,
} = require('../Services/service');

const registerController = {
  async createUser(req, res) {
    /**
     * Validate User before forwarding
     */

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if Email already exists
    const emailExists = await emailExistsCheck(req.body.email);
    if (emailExists) return res.status(400).send('Email Already Exists');

    // Hashing the Password
    const hashedPassword = await passwordHashing(req.body.password);
    /**
     * Creating new User
     */
    const data = {
      name: req.body.name,
      email: req.body.email,
      hashedPassword: hashedPassword,
    };
    const user = await registerUser(data);
    if (user)
      return res
        .status(201)
        .send(`User Created Successfully with id: ${user.id}`);
  },
};
module.exports = registerController;
