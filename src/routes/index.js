const express = require('express');

const app = express();

app.use(require('./health'));
app.use(require('./order'));

module.exports = app;