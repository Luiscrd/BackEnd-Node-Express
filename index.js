const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

// Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexión a la BD
dbConnection();

// Rutas
app.use('/api/v1/users', require('./routes/users'));

app.use('/api/v1/hospitals', require('./routes/hospital'));

app.use('/api/v1/medics', require('./routes/medic'));

app.use('/api/v1/login', require('./routes/auth'));

const port = process.env.PORT;

// Poner a escuchar el servidor
app.listen(port, () => {
  console.log(`[indexjs] Server run in: Http://localhost:${port}`.green);
  console.log(`[indexjs] Users: Http://localhost:${port}/api/v1/users`.green);
  console.log(`[indexjs] Hospitals:: Http://localhost:${port}/api/v1/hospitals`.green);
  console.log(`[indexjs] Medics:: Http://localhost:${port}/api/v1/medics`.green);
  console.log(`[indexjs] Login: Http://localhost:${port}/api/v1/login`.green);
});
