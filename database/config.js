const mongoose = require('mongoose');

const dbConnection = async () => {

    const user = process.env.MONGODB_USER;

    const password = process.env.MONGODB_PASSWORD;

    try {

        await mongoose.connect(`mongodb+srv://${user}:${password}@adminpro.fxdzqn4.mongodb.net/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        });

    } catch (error) {

        throw new Error('Error a la hora de iniciar la BD', error);

    }

}