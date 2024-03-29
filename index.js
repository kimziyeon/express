const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' })
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

const test = require('./router/test.js');
const push = require('./router/push.js');
const camera = require('./router/camera.js');
const portfolio = require('./router/portfolio.js');

app.use('/', test);
app.use('/push', push);
app.use('/camera', camera);
app.use('/portfolio', portfolio);



app.listen(3000)

