/* eslint-disable class-methods-use-this */
import db from './db';

export async function addTask(task) {
  const id = await db('task')
    .returning('id')
    .insert(task);
  return id;
}

export async function listTasks(sortBy, order) {
  const tasks = await db('task')
    .select('id', 'type', 'url', 'schedule', 'title', 'active', 'creation_date')
    .orderBy(sortBy, order);
  return tasks;
}
