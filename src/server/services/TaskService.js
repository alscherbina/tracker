/* eslint-disable class-methods-use-this */
import db from '../db';

class TaskService {
  async insertTask(task) {
    const id = await db('task')
      .returning('id')
      .insert(task);
    console.log('result ----- ');
    console.log(id);
  }
}

export default new TaskService();
