const { Router } = require('express');
const { check } = require('express-validator');
const { getAll, getAllById } = require('../controllers/all');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [
    validateJWT
], getAll);

router.get('/:id', [
    validateJWT
], getAllById);

module.exports = router;