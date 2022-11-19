const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, getHospitalById, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, validateRole } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [

], getHospitals);

router.get('/:id', [

], getHospitalById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
    validateJWT,
    validateRole
], createHospital);

router.put('/:id', [
    validateJWT,
    validateRole
], updateHospital);

router.delete('/:id', [
    validateJWT,
    validateRole
], deleteHospital);

module.exports = router;