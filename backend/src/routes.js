const express = require('express');
const router = express.Router();
const { optimizePrompt } = require('./optimizer');

router.post('/optimize', optimizePrompt);

module.exports = router;
