const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const generateJWT = require('../helpers/jwt');

const getHospitals = async (req = request, res = response) => {

    const hospitals = await Hospital.find({}, 'name img hospital');

    res.status(200).json({
        ok: true,
        hospitals
    });

}

const getHospitalById = async (req = request, res = response) => {

    const hospital = await Hospital.findById(req.params.id)

    res.status(200).json({
        ok: true,
        hospital
    });

}

const createHospital = async (req = request, res = response) => {

    try {

        const hospital = new Hospital(req.body);

        await hospital.save();

        res.status(200).json({
            ok: true,
            hospital
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const updateHospital = async (req = request, res = response) => {

    try {

        const exist = await Hospital.findById(req.params.id);

        if (!exist) {

            return res.status(400).json({
                ok: false,
                msg: 'Hospital no exist'
            });

        }

        const campos = req.body;

        const emailExist = await Hospital.findOne({ email: campos.email });

        const hospital = await Hospital.findByIdAndUpdate(req.params.id, campos, { new: true });

        res.status(200).json({
            ok: true,
            hospital
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const deleteHospital = async (req = request, res = response) => {

    try {

        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {

            return res.status(400).json({
                ok: false,
                msg: 'Hospital no exist'
            });

        }

        await hospital.delete();

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
    getHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    deleteHospital
}