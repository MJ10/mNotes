const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/*', (req, resp) => {
  resp.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started!');
});
