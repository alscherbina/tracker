import app from './configs/express';
import * as scheduler from './model/scheduler';

app.listen(3000, async () => {
  await scheduler.init();
  console.log('App started on port 3000');
});
