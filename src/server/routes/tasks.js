/* eslint-disable no-use-before-define */
import TaskService from '../services/TaskService';

export default function registerRoutes(router) {
  router.post('/tasks', addTask);
}

function addTask(req, res) {
  TaskService.insertTask(req.body);
  res.send('post request');
  console.log(req.body);
}
