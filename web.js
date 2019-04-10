const express = require('express');
const app = express();

app.use(express.logger('dev'));
app.use(express.static('dist'));
app.listen(process.env.PORT || 5000);
