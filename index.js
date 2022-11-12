const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

dbConnection();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({ ok: true, msg: 'Hola Mundo'})
});

app.listen(port, () => {
  console.log(`Servidor corriendo en: Http://localhost:${port}`)
});
