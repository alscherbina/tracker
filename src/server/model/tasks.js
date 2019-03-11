/* eslint-disable class-methods-use-this */
import db from './db';

export async function addTask(task) {
  const id = await db('task')
    .returning('id')
    .insert(task);
  console.log('result ----- ');
  console.log(id);
}
