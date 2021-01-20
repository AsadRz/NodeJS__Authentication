const restRouter = require('express').Router();
//Routes
const authRouter = require('./components/auth');

restRouter.use('/auth', authRouter);

module.exports = restRouter;
