const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users')

const validateJWT = (req = request, res = response, next) => {

    const jwtUser = req.header('jwt');

    if (jwtUser === undefined) {

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

        console.log(error)

        return res.status(401).json({
            ok: false,
            msg: 'JWT not valid'
        });

    }

}

const validateRole = async (req = request, res = response, next) => {

    const uid = req.uid;

    try {

        const usserDb = await User.findById(uid);

        if (!usserDb) {

            return res.status(400).json({
                ok: false,
                msg: 'User no Exist'
            });

        }

        if (usserDb.role !== 'ADMIN_ROLE') {

            return res.status(403).json({
                ok: false,
                msg: 'Permision Denegated'
            });

        }

        next();

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }
}

module.exports = {
    validateJWT,
    validateRole
}