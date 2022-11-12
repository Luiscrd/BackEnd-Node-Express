const User = require('../models/users');

const getUsers = async(req, res) => {

    const users = await User.find({});

    res.status(200).json({
        ok: true,
        users
    });

}

const createUser = async(req, res) => {

    const user = new User(req.body);

    await user.save();

    delete user.password;

    res.status(200).json({
        ok: true,
        user
    });

}

module.exports = {
    getUsers,
    createUser
}