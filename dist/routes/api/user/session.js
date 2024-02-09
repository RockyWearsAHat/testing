import express from 'express';
const sessionRouter = express.Router();
sessionRouter.get('/', async (req, res) => {
    res.status(200).json(req.session);
});
export default sessionRouter;
//# sourceMappingURL=session.js.map