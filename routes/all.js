const { Router } = require('express');
const { check } = require('express-validator');
const { getAll, getAllBySearc, getAllBySearcColection } = require('../controllers/all');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [
    validateJWT
], getAll);

router.get('/:search', [
    validateJWT
], getAllBySearc);

router.get('/:colection/:search', [
    validateJWT
], getAllBySearcColection);

module.exports = router;