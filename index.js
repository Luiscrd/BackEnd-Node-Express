const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'Hola Mundo'})
});

app.listen(port, () => {
  console.log(`Servidor corriendo en: Http://localhost:${port}`)
});