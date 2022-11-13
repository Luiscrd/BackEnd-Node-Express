const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const uploadFile = async (req = request, res = response) => {

    const collection = req.params.collection;

    const id = req.params.id;

    switch (collection) {
        case 'users':
  
            res.status(200).json({
                ok: true,
                collection,
                search,
            });
            break;

        case 'hospitals':
            res.status(200).json({
                ok: true,
                collection,
                search,
            });
            break;

        case 'medics':
            res.status(200).json({
                ok: true,
                collection,
                search,
            });
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: `'${collection}' not is valid term: (users, hospitals, medics).`
            });

    }

}


module.exports = {
    uploadFile
}