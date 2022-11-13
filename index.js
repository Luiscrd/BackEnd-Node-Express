const express = require('express');
const fileUpload = require('express-fileupload');
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

// File Upload
app.use(fileUpload());

// Conexión a la BD
dbConnection();

// Rutas
app.use('/api/v1/login', require('./routes/auth'));

app.use('/api/v1/upload', require('./routes/upload'));

app.use('/api/v1/all', require('./routes/all'));

app.use('/api/v1/users', require('./routes/users'));

app.use('/api/v1/hospitals', require('./routes/hospital'));

app.use('/api/v1/medics', require('./routes/medic'));

const port = process.env.PORT;

// Poner a escuchar el servidor
app.listen(port, () => {
  console.log(`[rserver] Server run in ---> Http://localhost:${port} <---`);
  console.log(`[routesl] ---------------------------------------------`.green);
  console.log(`[routesl] Login: Http://localhost:${port}/api/v1/login`.green);
  console.log(`[routesl] Upload File: Http://localhost:${port}/api/v1/upload`.green);
  console.log(`[routesl] Search All: Http://localhost:${port}/api/v1/all`.green);
  console.log(`[routesl] Users: Http://localhost:${port}/api/v1/users`.green);
  console.log(`[routesl] Hospitals:: Http://localhost:${port}/api/v1/hospitals`.green);
  console.log(`[routesl] Medics:: Http://localhost:${port}/api/v1/medics`.green);
  console.log(`[routesl] ---------------------------------------------`.green);
});
