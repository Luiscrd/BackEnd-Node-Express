const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users');
const { check } = require('express-validator')

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('nombre').not().isEmpty(),
    check('email').not().isEmpty().isEmail(),
    check('password').not().isEmpty()
], createUser);

module.exports = router;