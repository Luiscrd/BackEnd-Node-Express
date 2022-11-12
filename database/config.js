const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = () => {

    const baseUrl = 'mongodb+srv://';

    const user = process.env.MONGODB_USER;

    const password = process.env.MONGODB_PASSWORD;

    const db = process.env.MONGODB_DB;

    try {

        mongoose.connect(`${baseUrl}${user}:${password}${db}`);

        console.log('[mongose] -------------------------'.blue);
        console.log('[mongose] -> DB Online - MongoDB <-'.blue);
        console.log('[mongose] -------------------------'.blue);

    } catch (error) {

        console.log(error);

    }

}

module.exports = {
    dbConnection
}