import * as model from '../model';
import log from '../configs/logger';

export async function getJournal(req, res) {
  const { taskId } = req.params;
  return model.getJournal(taskId);
}
