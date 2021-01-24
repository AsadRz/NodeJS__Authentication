const restRouter = require('express').Router();
//Routes
const authRouter = require('./components/auth');
const registerRouter = require('./components/register');

restRouter.use('/auth/login', authRouter);
restRouter.use('/auth/register', registerRouter);

module.exports = restRouter;
