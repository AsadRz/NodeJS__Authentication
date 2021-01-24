const registerRouter = require('express').Router();
const registerController = require('../Controller/registerController');

registerRouter.post('/', registerController.createUser);
module.exports = registerRouter;
