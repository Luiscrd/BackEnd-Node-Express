const jwt = require('jsonwebtoken');

const generateJWT = (user) => {

    return new Promise((resolve, reject) => {

        const { uid, name, email, role } = user;

        const payload = {
            uid,
            name,
            email,
            role
        };

        const key = process.env.JWT_SECRET;

        jwt.sign(payload, key, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {

                console.log(err);

                reject('Not generated JWT');

            } else {

                resolve(token);

            }

        });

    })

}

module.exports = generateJWT;