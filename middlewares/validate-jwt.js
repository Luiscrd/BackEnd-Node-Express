const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {

    const jwtUser = request.header('jwt');

    if (!jwtUser) {

        return res.status(401).json({
            ok: false,
            msg: 'No JWT in headers'
        });

    }

    try {

        const { uid } = jwt.verify(jwtUser, process.env.JWT_SECRET);

        req.uid = uid;

        next();
        
    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: 'JWT not valid'
        });

    }

}

module.exports = {
    validateJWT
}