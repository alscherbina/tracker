import express from 'express';
import path from 'path';
import request from 'request-promise-native';
import cheerio from 'cheerio';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/parse', async (req, res) => {
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

app.post('/api/tasks', (req, res) => {
  res.send('post request');
  console.log(req.body);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
