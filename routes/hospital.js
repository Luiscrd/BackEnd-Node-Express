const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, getHospitalById, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get('/', [

], getHospitals);

router.get('/:id', [

], getHospitalById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
    validateJWT,
], createHospital);

router.put('/:id', [
    validateJWT
], updateHospital);

router.delete('/:id', [
    validateJWT
], deleteHospital);

module.exports = router;