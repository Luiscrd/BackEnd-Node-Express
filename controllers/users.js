const { request, response } = require('express');
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

        await user.save();

        delete user.password;

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
    createUser
}