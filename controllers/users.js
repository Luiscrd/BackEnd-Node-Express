const getUsers = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Hola Mundo'
    });

}

const createUser = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Hola Mundo'
    });

}

module.exports = {
    getUsers,
    createUser
}