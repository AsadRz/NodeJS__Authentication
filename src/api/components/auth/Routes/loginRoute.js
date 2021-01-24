const loginRouter = require('express').Router();
const loginController = require('../Controller/loginController');

loginRouter.post('/', loginController.authenticateUser);
module.exports = loginRouter;
