const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], createUser);

router.put('/:id', [], updateUser);

router.delete('/:id', [], deleteUser);

module.exports = router;