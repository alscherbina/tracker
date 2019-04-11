import * as model from '../model';

export async function getTask(req) {
  const { taskId } = req.params;
  const task = await model.getTask(taskId);
  return task;
}

export async function addTask(req) {
  const task = {};
  if (req.body && req.body.data) {
    const { data } = req.body;
    task.title = data.title;
    task.url = data.url;
    task.schedule = data.schedule;
    task.type = data.type;
    await model.createTask(task);
  }
}

export async function listTasks(req) {
  const { sortBy, order, tasksStatus, searchText } = req.query;
  const filter = { tasksStatus, searchText };
  const tasks = await model.listTasks(filter, sortBy, order);
  return tasks;
}

export async function deleteTask(req) {
  const { taskId } = req.params;
  await model.deleteTask(taskId);
}
