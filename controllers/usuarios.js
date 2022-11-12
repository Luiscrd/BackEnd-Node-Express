const getUsuarios = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Hola Mundo'
    });

}

module.exports = {
    getUsuarios
}