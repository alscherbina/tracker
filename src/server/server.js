import express from 'express';
import path from 'path';
import request from 'request-promise-native';
import cheerio from 'cheerio';
import registerTaskRoutes from './routes/tasks';

const app = express();

app.use(express.static('public'));
app.use(express.json());

const apiRouter = express.Router();
registerTaskRoutes(apiRouter);
app.use('/api', apiRouter);

app.get('/parse', async (req, res) => {
  const options = {
    uri: req.query.uri,
    transform: body => {
      return cheerio.load(body);
    }
  };

  try {
    const $ = await request(options);
    res.send($('meta[itemprop="price"]').attr('content'));
  } catch (err) {
    console.log(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
