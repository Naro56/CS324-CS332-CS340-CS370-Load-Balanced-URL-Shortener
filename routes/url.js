const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const redisClient = require('../redisClient');

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortId = shortid.generate();
    await redisClient.set(shortId, longUrl);
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
});

router.get('/:id', async (req, res) => {
    const longUrl = await redisClient.get(req.params.id);
    if (longUrl) return res.redirect(longUrl);
    res.status(404).json({ error: 'URL not found' });
});

module.exports = router;
