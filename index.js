const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
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

app.use('/api/v1/login', require('./routes/auth'));

const port = process.env.PORT;

// Poner a escuchar el servidor
app.listen(port, () => {
  console.log(`Server run in: Http://localhost:${port}`);
  console.log(`Users: Http://localhost:${port}/api/v1/users`);
  console.log(`Login: Http://localhost:${port}/api/v1/login`);
});
