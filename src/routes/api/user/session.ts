import express, { Request, Response } from 'express';

const sessionRouter = express.Router();

sessionRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json(req.session);
});

export default sessionRouter;
