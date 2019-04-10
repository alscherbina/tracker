/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import * as pgErrors from 'pg-error-constants';
import db from './db';
import { ModelError } from './errors/ModelError';
import errorCodes from './errors/errorCodes';
import log from '../configs/logger';

export async function addTask(task) {
  try {
    const result = await db('task')
      .returning('*')
      .insert(task);
    return result;
  } catch (err) {
    if (err.code === pgErrors.UNIQUE_VIOLATION && err.constraint === 'task_url_key') {
      err.message = `Task with this URL already exists (${task.url})`;
      err.code = errorCodes.TASK_URL_KEY_DUPLICATE;
      log.verbose(err);
    } else {
      log.error(err);
    }
    throw new ModelError(err);
  }
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

export async function deleteTask(taskId) {
  await db('task')
    .where('id', taskId)
    .del();
  log.verbose(`Task #${taskId} deleted.`);
}
