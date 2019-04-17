/**
 * Model facade.
 * All model interactions should be done using this interface only.
 */
import * as tasksDao from './tasks';
import * as journalDao from './journal';
import * as scheduler from './scheduler';

export async function getTask(taskId) {
  return tasksDao.getTask(taskId);
}

export async function createTask(task) {
  const addedTask = await tasksDao.addTask(task);
  scheduler.scheduleJob(addedTask[0]);
}

export async function listTasks(filter, sortBy, order) {
  return tasksDao.listTasks(filter, sortBy, order);
}

export async function deleteTask(taskId) {
  await tasksDao.deleteTask(taskId);
  scheduler.removeJob(taskId);
}

export async function getJournal(taskId) {
  return journalDao.getJournal(taskId);
}
