import express from 'express';
import tasksRouter from './tasks';

const router = express.Router();

router.use(tasksRouter);

export default router;
