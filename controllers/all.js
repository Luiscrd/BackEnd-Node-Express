const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const getAll = async (req = request, res = response) => {

    const search = req.query.search;

    res.status(200).json({
        ok: true,
        search
    });

}

const getAllById = async (req = request, res = response) => {


    const search = req.params.search;

    res.status(200).json({
        ok: true,
        search
    });

}




module.exports = {
    getAll,
    getAllById
}