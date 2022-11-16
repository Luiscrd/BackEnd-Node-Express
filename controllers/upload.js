const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');
const { uploadImg } = require('../helpers/update-img');

const uploadFile = async (req = request, res = response) => {

    const collection = req.params.collection;

    const id = req.params.id;

    const validColletions = ['users', 'hospitals', 'medics'];

    if (!validColletions.includes(collection)) {

        return res.status(400).json({
            ok: false,
            msg: `'${collection}' not is valid term: (users, hospitals, medics).`
        });

    }

    // VFalidar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok: false,
            msg: 'No files in rquest'
        });

    }

    // Procesar la imagen
    const file = req.files.image;

    const ext = file.name.split('.').at(-1);

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(ext)) {

        return res.status(400).json({
            ok: false,
            msg: `'${collection}' not is valid extensiion: (png, jpg, jpeg, gif).`
        });

    }

    // Genherar nombre archivo
    const fileName = `${uuidv4()}.${ext}`;

    // Path para guardar la img
    const path = `./uploads/${collection}/${fileName}`;

    // Mover imagen
    file.mv(path, (error) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                ok: false,
                msg: 'Error to move img'
            });

        }

        // Actualizar Bd
        uploadImg(collection, id, fileName);

        res.status(200).json({
            ok: true,
            msg: `File: ${fileName}, upload Ok`,
            fileName
        });

    });

}

const getFile = async (req = request, res = response) => {

    const collection = req.params.collection;

    const iamge = req.params.image;

    const pathImage = path.join(__dirname, `../uploads/${collection}/${iamge}`);

    // Imagen por defecto
    const defaultImage = path.join(__dirname, '../uploads/no-profile-picture-icon-6.png');

    if (!fs.existsSync(pathImage)) {

        res.sendFile(defaultImage);

    } else {

        res.sendFile(pathImage);

    }

}


module.exports = {
    uploadFile,
    getFile
}