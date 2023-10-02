const express = require('express');
const app = express();
const router = require('./router/routes');
app.use(express.json(), router);



app.listen(3000);