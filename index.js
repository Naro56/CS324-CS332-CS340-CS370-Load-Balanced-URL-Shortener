const express = require('express');
const { nanoid } = require('nanoid');
const redisClient = require('./redisClient');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/shorten', async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortId = nanoid(7);
  await redisClient.set(shortId, longUrl);
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;
  res.render('result', { shortUrl });
});

app.get('/:id', async (req, res) => {
  const longUrl = await redisClient.get(req.params.id);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
