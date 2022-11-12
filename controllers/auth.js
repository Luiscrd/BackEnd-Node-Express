const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

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

        // Generar JWT

        // Verificar password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {

            return res.status(400).json({
                ok: false,
                msg: 'User or passwor not vaslid'
            });

        }

        res.status(200).json({
            ok: true,
            user
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

module.exports = {
    loginUser
}