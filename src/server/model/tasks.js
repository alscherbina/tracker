/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import db from './db';

export async function addTask(task) {
  const id = await db('task')
    .returning('id')
    .insert(task);
  return id;
}

export async function listTasks(filter, sortBy, order) {
  const query = db('task')
    .select('id', 'type', 'url', 'schedule', 'title', 'active', 'creation_date')
    .where(function() {
      if (filter.tasksStatus) {
        this.where('active', filter.tasksStatus === 'active');
      }
      if (filter.searchText) {
        this.andWhere(function() {
          this.where('title', 'like', `%${filter.searchText}%`).orWhere('url', 'like', `%${filter.searchText}%`);
        });
      }
    })
    .orderBy(sortBy, order);
  const tasks = await query;
  return tasks;
}
