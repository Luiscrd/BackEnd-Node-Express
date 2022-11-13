const { Router } = require('express');
const { check } = require('express-validator');
const { getMedics, getMedicById, createMedic, updateMedic, deleteMedic } = require('../controllers/medic');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [

], getMedics);

router.get('/:id', [

], getMedicById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').not().isEmpty(),
    check('hospital', 'Format Hospital id not valid').isMongoId(),
    validateFields,
    validateJWT,
], createMedic);

router.put('/:id', [
    validateJWT
], updateMedic);

router.delete('/:id', [
    validateJWT
], deleteMedic);

module.exports = router;