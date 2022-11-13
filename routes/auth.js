const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, googleUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Format no valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], loginUser);

router.post('/google', [
    check('jwt', 'JWT is required').not().isEmpty(),
    check('jwt', 'JWT no valid').isJWT(),
    validateFields,
], googleUser);

router.get('/renew', [
    validateJWT
], renewToken);

module.exports = router;