const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], createUser);

module.exports = router;