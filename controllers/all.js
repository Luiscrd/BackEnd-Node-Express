const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const generateJWT = require('../helpers/jwt');

const getAll = async (req = request, res = response) => {

   
    res.status(200).json({
        ok: true,
    });

}

const getAllById = async (req = request, res = response) => {


    res.status(200).json({
        ok: true,
    });

}




module.exports = {
    getAll,
    getAllById
}