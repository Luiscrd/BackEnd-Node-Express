const User = require('../models/users');

const getUsers = (req, res) => {

    res.status(200).json({
        ok: true,
    });

}

const createUser = async(req, res) => {

    const user = new User(req.body);

    await user.save();

    const { name, email, role, google } = user;

    const resp = {
        id: user._id,
        name,
        email,
        role,
        google

    }

    res.status(200).json({
        ok: true,
        user: resp
    });

}

module.exports = {
    getUsers,
    createUser
}