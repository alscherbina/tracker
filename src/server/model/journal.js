/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import db from './db';
import log from '../configs/logger';

export async function getJournal(taskId) {
  log.info(`journal records for ${taskId}`);
  const result = await db('journal')
    .select({ date: db.raw('date(execution_date)') })
    .avg({ result: db.raw('result::integer') })
    .where('task_id', taskId)
    .groupBy('task_id', 'date')
    .orderBy('date');
  return result;
}
