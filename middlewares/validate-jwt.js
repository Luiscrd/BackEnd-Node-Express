const { request, response } = require('express');

const validateJWT = (req = request, res = response, next) => {

    const jwt = request.header('jwt');


    next();

}

module.exports = {
    validateJWT
}