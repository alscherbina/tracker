import * as tasksDao from './tasks';
import * as scheduler from './scheduler';

async function getTask(taskId) {
  return tasksDao.getTask(taskId);
}

async function createTask(task) {
  const addedTask = await tasksDao.addTask(task);
  scheduler.scheduleJob(addedTask[0]);
}

async function listTasks(filter, sortBy, order) {
  return tasksDao.listTasks(filter, sortBy, order);
}

async function deleteTask(taskId) {
  await tasksDao.deleteTask(taskId);
  scheduler.removeJob(taskId);
}

export { getTask, createTask, listTasks, deleteTask };
