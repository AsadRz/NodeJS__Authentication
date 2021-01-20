const registerRouter = require('express').Router();
const registerController = require('../Controller/registerController');

registerRouter.post('/register', registerController.createUser);
module.exports = registerRouter;
