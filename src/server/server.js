import app from './configs/express';
import * as scheduler from './model/scheduler';
import log from './configs/logger';

app.listen(3000, async () => {
  await scheduler.init();
  log.info('App started on port 3000');
});
