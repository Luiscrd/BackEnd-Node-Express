const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

dbConnection();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({ ok: true, msg: 'Hola Mundo'})
});

app.listen(port, () => {
  console.log(`Servidor corriendo en: Http://localhost:${port}`)
});