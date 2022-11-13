const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const uploadFile = async (req = request, res = response) => {

    const collection = req.params.collection;

    const id = req.params.id;

    const validColletions = ['users', 'hospitals', 'medics'];

    if ( !validColletions.includes(collection) ) {

        return res.status(400).json({
            ok: false,
            msg: `'${collection}' not is valid term: (users, hospitals, medics).`
        });

    }

    // VFalidar que exista un archivo
    if ( !req.files || Object.keys(req.files).length === 0 ) {

        return res.status(400).json({
            ok: false,
            msg: 'No files in rquest'
        });

    }

    // Procesar la imagen

    console.log(req.files.image);

    res.status(200).json({
        ok: true,
        msg: 'File upload Ok'
    });

}


module.exports = {
    uploadFile
}