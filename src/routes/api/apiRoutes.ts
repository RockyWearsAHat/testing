import express from 'express';
import loginRouter from './user/login.js';
import registerRouter from './user/register.js';
import registerArtistRouter from './artist/register.js';
import sessionRouter from './user/session.js';

const apiRouter = express.Router();

apiRouter.use('/user/create', registerRouter);

apiRouter.use('/user/createArtist', registerArtistRouter);

apiRouter.use('/user/login', loginRouter);

apiRouter.use('/session', sessionRouter);

export default apiRouter;
