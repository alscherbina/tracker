import * as tasksDao from './tasks';
import * as scheduler from './scheduler';

async function createTask(task) {
  const addedTask = await tasksDao.addTask(task);
  scheduler.scheduleJob(addedTask[0]);
}

async function listTasks(filter, sortBy, order) {
  const tasks = await tasksDao.listTasks(filter, sortBy, order);
  return tasks;
}

async function deleteTask(taskId) {
  await tasksDao.deleteTask(taskId);
  scheduler.removeJob(taskId);
}

export { createTask, listTasks, deleteTask };
