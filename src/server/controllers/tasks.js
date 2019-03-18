import * as tasksDao from '../model/tasks';

export async function addTask(req) {
  const task = {};
  if (req.body && req.body.data) {
    const { data } = req.body;
    task.title = data.title;
    task.url = data.url;
    task.schedule = data.schedule;
    task.type = data.type;
  }
  return tasksDao.addTask(task);
}

export async function listTasks(req, res) {
  const { sortBy, order } = req.query;
  const tasks = await tasksDao.listTasks(sortBy, order);
  return tasks;
}
