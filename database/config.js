const mongoose = require('mongoose');

const dbConnection = () => {

    const baseUrl = 'mongodb+srv://';

    const user = process.env.MONGODB_USER;

    const password = process.env.MONGODB_PASSWORD;

    const db = process.env.MONGODB_DB;

    try {

        mongoose.connect(`${baseUrl}${user}:${password}${db}`);

        console.log('DB Online');

    } catch (error) {

        console.log(error);

        throw new Error('Error a la hora de iniciar la BD', error);

    }

}

module.exports = {
    dbConnection
}