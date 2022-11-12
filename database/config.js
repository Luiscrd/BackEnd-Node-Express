const mongoose = require('mongoose');

const dbConnection = () => {

    const baseUrl = 'mongodb+srv://';

    const user = process.env.MONGODB_USER;

    const password = process.env.MONGODB_PASSWORD;

    const db = process.env.MONGODB_DB;

    try {

        mongoose.connect(`${baseUrl}${user}:${password}${db}`);

        console.log('-----------------------');
        console.log('- DB Online - MongoDB -');
        console.log('-----------------------');

    } catch (error) {

        console.log(error);

    }

}

module.exports = {
    dbConnection
}