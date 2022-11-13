const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Medic = require('../models/medic');
const generateJWT = require('../helpers/jwt');

const getMedics = async (req = request, res = response) => {

    const medics = await Medic.find()
    .populate('user', 'name img')
    .populate('hospital', 'name img');

    res.status(200).json({
        ok: true,
        medics
    });

}

const getMedicById = async (req = request, res = response) => {

    const medic = await Medic.findById(req.params.id)

    res.status(200).json({
        ok: true,
        medic
    });

}

const createMedic = async (req = request, res = response) => {

    try {

        const medic = new Medic({...req.body, user: req.uid});

        await medic.save();

        res.status(200).json({
            ok: true,
            medic
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const updateMedic = async (req = request, res = response) => {

    try {

        const exist = await Medic.findById(req.params.id);

        if (!exist) {

            return res.status(400).json({
                ok: false,
                msg: 'Medic no exist'
            });

        }

        const campos = req.body;

        const emailExist = await Medic.findOne({ email: campos.email });

        const medic = await Medic.findByIdAndUpdate(req.params.id, campos, { new: true });

        res.status(200).json({
            ok: true,
            medic
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const deleteMedic = async (req = request, res = response) => {

    try {

        const medic = await Medic.findById(req.params.id);

        if (!medic) {

            return res.status(400).json({
                ok: false,
                msg: 'Medic no exist'
            });

        }

        await medic.delete();

        res.status(200).json({
            ok: true
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

module.exports = {
    getMedics,
    getMedicById,
    createMedic,
    updateMedic,
    deleteMedic
}