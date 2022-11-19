const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const colors = require('colors');
var serveIndex = require('serve-index');
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

// Carpeta publica
app.use(express.static('public'));

// Rutas
app.use('/api/v1/login', require('./routes/auth'));

app.use('/api/v1/upload', require('./routes/upload'));

app.use('/api/v1/all', require('./routes/all'));

app.use('/api/v1/users', require('./routes/users'));

app.use('/api/v1/hospitals', require('./routes/hospital'));

app.use('/api/v1/medics', require('./routes/medic'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

// Imagenes

// app.use(express.static(__dirname + '/'));
// app.use('/api/v1/uploads', serveIndex(__dirname + '/uploads'));

const port = process.env.PORT;

// Poner a escuchar el servidor
app.listen(port, () => {
  console.log(`[rserver] Server run in ---> Http://localhost:${port} <---`);
  console.log(`[routesl] ---------------------------------------------`.green);
  console.log(`[routesl] Login: Http://localhost:${port}/api/v1/login`.green);
  console.log(`[routesl] Files: Http://localhost:${port}/api/v1/upload`.green);
  console.log(`[routesl] Search All: Http://localhost:${port}/api/v1/all`.green);
  console.log(`[routesl] Users: Http://localhost:${port}/api/v1/users`.green);
  console.log(`[routesl] Hospitals:: Http://localhost:${port}/api/v1/hospitals`.green);
  console.log(`[routesl] Medics:: Http://localhost:${port}/api/v1/medics`.green);
  console.log(`[routesl] ---------------------------------------------`.green);
});
