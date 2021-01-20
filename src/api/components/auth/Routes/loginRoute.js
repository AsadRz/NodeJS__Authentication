const loginRouter = require('express').Router();
const loginController = require('../Controller/loginController');

loginRouter.post('/login', loginController.authenticateUser);
module.exports = loginRouter;
