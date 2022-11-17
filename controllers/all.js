const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const getAll = async (req = request, res = response) => {

    const search = req.query.search;

    const collection = req.query.collection;

    const regex = new RegExp(search, 'i');

    const limit = Number(req.query.limit) || 5;

    switch (collection) {
        case 'users':
            const totalUser = await User.find({ name: regex }).length;
            const usersId = await User.find({ name: regex }).limit(limit);
            res.status(200).json({
                ok: true,
                collection,
                search,
                users: usersId,
                total: totalUser
            });
            break;

        case 'hospitals':
            const hospitalsId = await Hospital.find({ name: regex }).limit(limit);
            res.status(200).json({
                ok: true,
                collection,
                search,
                hospitals: hospitalsId
            });
            break;

        case 'medics':
            const total = await Medic.find({ name: regex }).length;
            const medicsId = await Medic.find({ name: regex }).limit(limit);
            res.status(200).json({
                ok: true,
                collection,
                search,
                medics: medicsId,
                total
            });
            break;

        case undefined:
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
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: `'${collection}' not is valid term: (users, hospitals, medics).`
            });
    }

}

const getAllBySearc = async (req = request, res = response) => {

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

const getAllBySearcColection = async (req = request, res = response) => {

    const collection = req.params.colection;

    const search = req.params.search;

    const regex = new RegExp(search, 'i');

    const limit = Number(req.query.limit) || 5;

    switch (collection) {
        case 'users':
            // const totalUsers = (await User.find({ name: regex })).length;
            const users = await User.find({ name: regex })
            // .limit(limit);
            res.status(200).json({
                ok: true,
                search,
                users,
                // total: totalUsers
            });
            break;

        case 'hospitals':
            const hospitals = await Hospital.find({ name: regex }).limit(limit);
            res.status(200).json({
                ok: true,
                search,
                hospitals
            });
            break;

        case 'medics':
            const medics = await Medic.find({ name: regex }).limit(limit);
            res.status(200).json({
                ok: true,
                search,
                medics
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
    getAll,
    getAllBySearc,
    getAllBySearcColection
}