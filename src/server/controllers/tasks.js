import * as tasksDao from '../model/tasks';

export async function addTask(req, res) {
  const task = {};
  if (req.body && req.body.data) {
    const { data } = req.body;
    task.title = data.title;
    task.url = data.url;
    task.schedule = data.schedule;
    task.type = data.type;
  }
  return await tasksDao.addTask(task);
}
