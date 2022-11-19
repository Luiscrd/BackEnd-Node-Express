const { Router } = require('express');
const { check } = require('express-validator');
const { getAll, getAllBySearc, getAllBySearcColection } = require('../controllers/all');
const { validateJWT, validateRole } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [
    validateJWT,
    validateRole
], getAll);

router.get('/:search', [
    validateJWT,
    validateRole
], getAllBySearc);

router.get('/:colection/:search', [
    validateJWT,
    validateRole
], getAllBySearcColection);

module.exports = router;