const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const getUsers = async (req = request, res = response) => {

    const users = await User.find({}, 'name email role google');

    res.status(200).json({
        ok: true,
        users
    });

}

const createUser = async (req = request, res = response) => {

    try {

        const exist = await User.findOne({ email: req.body.email })

        if (exist) {

            return res.status(400).json({
                ok: false,
                msg: 'Email exist'
            });

        }

        const user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(user.password, salt)

        await user.save();

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

const updateUser = async (req = request, res = response) => {

    try {

        const exist = await User.findById(req.params.id);

        if (!exist) {

            return res.status(400).json({
                ok: false,
                msg: 'User no exist'
            });

        }

        const emailExist = await User.findOne({ email: request.body.email });

        if (emailExist) {

            if (exist.email.id != emailExist.id) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Email exist'
                });
    
            }

        }
        
        const campos = req.body;

        delete campos.role;

        delete campos.google;

        if (campos.password) {

            // Encriptar nuevo password
            const salt = bcrypt.genSaltSync();

            campos.password = bcrypt.hashSync(campos.password, salt);


        }

        const user = await User.findByIdAndUpdate(req.params.id, campos, { new: true })

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
    getUsers,
    createUser,
    updateUser
}