import express from 'express';
import request from 'request-promise-native';
import cheerio from 'cheerio';
import controllers from '../controllers';

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
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

const router = express.Router();

router.post('/tasks', c(controllers.tasks.addTask));
router.get('/tasks', c(controllers.tasks.listTasks));

router.get('/parse', async (req, res) => {
  const options = {
    uri: req.query.uri,
    transform: body => {
      return cheerio.load(body);
    }
  };

  try {
    const $ = await request(options);
    res.send($('meta[itemprop="price"]').attr('content'));
  } catch (err) {
    console.log(err);
  }
});

export default router;
