const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const generateJWT = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/jwt-google');
const { getMenuFrontEnd } = require('../helpers/menu-fontend');

const loginUser = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                ok: false,
                msg: 'User or passwor not vaslid'
            });

        }

        // Verificar password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {

            return res.status(400).json({
                ok: false,
                msg: 'User or passwor not vaslid'
            });

        }

        // Generar JWT
        const jwt = await generateJWT(user);

        res.status(200).json({
            ok: true,
            jwt,
            menu: getMenuFrontEnd(user.role)
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const googleUser = async (req = request, res = response) => {

    const jwtGoogle = req.body.jwt;

    try {

        const { name, email, picture } = await verifyGoogle(jwtGoogle);

        const userDB = await User.findOne({ email });

        let user;

        if (!userDB) {

            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })

        } else {

            user = userDB;
            user.google = true;

        }

        await user.save();

        // Generar JWT
        const jwt = await generateJWT(user);

        res.status(200).json({
            ok: true,
            user,
            jwt,
            menu: getMenuFrontEnd(user.role)
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'GoogleToken no valid'
        });

    }

}

const renewToken = async (req = request, res = response) => {

    const uid = req.uid;

    const user = await User.findById(uid);

    const jwt = await generateJWT(user);

    res.status(200).json({
        ok: true,
        user,
        jwt,
        menu: getMenuFrontEnd(user.role)
    });

}

module.exports = {
    loginUser,
    googleUser,
    renewToken
}