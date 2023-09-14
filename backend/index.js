const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const routerBase1 = require('./routes/routes.js');
app.use('/EPS_Campus_14sep', routerBase1);

require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`el server listening on ${port}`);
});
