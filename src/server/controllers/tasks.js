import * as tasksDao from '../model/tasks';
import * as scheduler from '../model/scheduler';

export async function addTask(req) {
  const task = {};
  if (req.body && req.body.data) {
    const { data } = req.body;
    task.title = data.title;
    task.url = data.url;
    task.schedule = data.schedule;
    task.type = data.type;
  }
  const addedTask = await tasksDao.addTask(task);
  scheduler.scheduleJob(addedTask[0]);
}

export async function listTasks(req) {
  const { sortBy, order, tasksStatus, searchText } = req.query;
  const filter = { tasksStatus, searchText };
  const tasks = await tasksDao.listTasks(filter, sortBy, order);
  return tasks;
}
