import express from 'express';
import apiRouter from './api/apiRoutes.js';
const router = express.Router();
router.use('/api', apiRouter);
export default router;
//# sourceMappingURL=router.js.map