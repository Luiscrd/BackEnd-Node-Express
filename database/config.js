const mongoose = require('mongoose');

const dbConnection = () => {

    const user = 'lcarballo';

    const password = 'PcHQKHfn6shAIJto';

    try {

        mongoose.connect(`mongodb+srv://${user}:${password}@adminpro.fxdzqn4.mongodb.net/test`);

        console.log('DB Online');

    } catch (error) {

        console.log(error);

        throw new Error('Error a la hora de iniciar la BD', error);

    }

}

module.exports = {
    dbConnection
}