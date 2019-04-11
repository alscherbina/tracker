import express from 'express';
import validate from 'express-validation';
import controllers from '../controllers';
import * as validations from '../validations/task.validation';

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (controller, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [req, res, next];
  try {
    const result = await controller(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return next(error);
  }
};
const c = controllerHandler;

const router = express.Router();

router.get('/tasks/:taskId', validate(validations.getTask), c(controllers.tasks.getTask));
router.post('/tasks', validate(validations.addTask), c(controllers.tasks.addTask));
router.get('/tasks', c(controllers.tasks.listTasks));
//router.get('/tasks', (req, res, next) => next({ message: 'Tasks listing error.' }));
router.delete('/task/:taskId', validate(validations.deleteTask), c(controllers.tasks.deleteTask));

export default router;
