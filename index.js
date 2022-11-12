const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

dbConnection();

app.use('/api/v1/users', require('./routes/users'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server run in: Http://localhost:${port}`)
});
