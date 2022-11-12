const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [
    validateJWT
], getUsers);

router.get('/:id', [
    validateJWT
], getUserById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], createUser);

router.put('/:id', [
    validateJWT
], updateUser);

router.delete('/:id', [
    validateJWT
], deleteUser);

module.exports = router;