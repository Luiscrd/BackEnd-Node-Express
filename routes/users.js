const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users');
const { check } = require('express-validator')

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], createUser);

module.exports = router;