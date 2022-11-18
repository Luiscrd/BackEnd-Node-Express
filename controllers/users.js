const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const generateJWT = require('../helpers/jwt');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d9094b3b22841d",
      pass: "80d5b29bc9a6df"
    }
  });

const getUsers = async (req = request, res = response) => {

    const to = Number(req.query.to) || 0;

    const limit = Number(req.query.limit) || 5;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img').skip(to).limit(limit),
        User.countDocuments()
    ]);
    
    res.status(200).json({
        ok: true,
        users,
        total
    });

}

const getUserById = async (req = request, res = response) => {

    const user = await User.findById(req.params.id)

    res.status(200).json({
        ok: true,
        user
    });

}

const createUser = async (req = request, res = response) => {

    try {

        const exist = await User.findOne({ email: req.body.email });

        if (exist) {

            return res.status(400).json({
                ok: false,
                msg: 'Email exist'
            });

        }

        const user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(user.password, salt);

        await user.save();

        const message = {
            from: 'acces@adminpro.com', // Sender address
            to: 'luiscrua1987@gmail.com',         // List of recipients
            subject: 'Verifica tu correo', // Subject line
            text: 'Pulsa en el siguiente enlace para verificar su correo.' // Plain text body
        };

        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        })

        // Generar JWT
        const jwt = await generateJWT(user);

        res.status(200).json({
            ok: true,
            jwt,
            user
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const updateUser = async (req = request, res = response) => {

    try {

        const exist = await User.findById(req.params.id);

        if (!exist) {

            return res.status(400).json({
                ok: false,
                msg: 'User no exist'
            });

        }

        const campos = req.body;

        delete campos.google;

        const emailExist = await User.findOne({ email: campos.email });

        if (emailExist) {

            if (exist.id != emailExist.id) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Email exist'
                });

            }

        }

        if (campos.password) {

            // Encriptar nuevo password
            const salt = bcrypt.genSaltSync();

            campos.password = bcrypt.hashSync(campos.password, salt);

        }

        const user = await User.findByIdAndUpdate(req.params.id, campos, { new: true });

        res.status(200).json({
            ok: true,
            user
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });

    }

}

const deleteUser = async (req = request, res = response) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(400).json({
                ok: false,
                msg: 'User no exist'
            });

        }

        await user.delete();

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
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}