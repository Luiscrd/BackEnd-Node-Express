const getUsers = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Get Users...'
    });

}

const createUser = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Creating User...'
    });

}

module.exports = {
    getUsers,
    createUser
}