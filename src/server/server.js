import app from './configs/express';
import * as scheduler from './model/scheduler';
import log from './configs/logger';
import config from './configs/vars';

app.listen(config.port, async () => {
  await scheduler.init();
  log.info(`App started on port ${config.port}`);
});
