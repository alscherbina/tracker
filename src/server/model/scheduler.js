/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
import * as cron from 'node-cron';
import cheerio from 'cheerio';
import request from 'request-promise-native';
import db from './db';

const jobs = new Map();

function removeJob(taskId) {
  if (jobs.has(taskId)) {
    const job = jobs.get(taskId);
    job.destroy();
    jobs.delete(taskId);
  }
}

function scheduleJob(task) {
  removeJob(task.id);
  if (cron.validate(task.schedule)) {
    const job = cron.schedule(task.schedule, async () => {
      const options = {
        uri: task.url,
        transform: body => {
          return cheerio.load(body);
        }
      };
      try {
        const $ = await request(options);
        const result = $('meta[itemprop="price"]').attr('content');
        await db('journal').insert({ task_id: task.id, result });
      } catch (err) {
        console.log(err);
      }
      console.log(`${new Date()}: Task #${task.id} executed!`);
    });
    jobs.set(task.id, job);
  } else {
    console.log(`${new Date()}: Task #${task.id} schedule expression is not valid - '${task.schedule}'`);
  }
}

async function init() {
  const tasks = await db
    .from('task')
    .select('id', 'type', 'url', 'schedule')
    .where('active', true);
  for (const task of tasks) {
    scheduleJob(task);
  }
}

export { init, scheduleJob, removeJob };
