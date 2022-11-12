const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], loginUser);

module.exports = router;