import express from 'express';
import tasksRouter from './tasks';
import authRouter from './authentication';

const router = express.Router();

router.use(authRouter);
router.use(tasksRouter);

export default router;
