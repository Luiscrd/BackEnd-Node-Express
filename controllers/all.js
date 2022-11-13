const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const getAll = async (req = request, res = response) => {

    const search = req.query.search;

    const regex = new RegExp(search, 'i');

    const limit = Number(req.query.limit) || 5;

    const [users, hospitals, medics] = await Promise.all([
        User.find({ name: regex }).limit(limit),
        Hospital.find({ name: regex }).limit(limit).populate('user', 'name img'),
        Medic.find({ name: regex }).limit(limit).populate('user', 'name img')
        .populate('hospital', 'name img')
    ]);

    res.status(200).json({
        ok: true,
        search,
        users,
        hospitals,
        medics,
    });

}

const getAllById = async (req = request, res = response) => {

    const search = req.params.search;

    const regex = new RegExp(search, 'i');

    const limit = Number(req.query.limit) || 5;

    const [users, hospitals, medics] = await Promise.all([
        User.find({ name: regex }).limit(limit),
        Hospital.find({ name: regex }).limit(limit).populate('user', 'name img'),
        Medic.find({ name: regex }).limit(limit).populate('user', 'name img')
        .populate('hospital', 'name img')
    ]);

    res.status(200).json({
        ok: true,
        search,
        users,
        hospitals,
        medics,
    });

}




module.exports = {
    getAll,
    getAllById
}