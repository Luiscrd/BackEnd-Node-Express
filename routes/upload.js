const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, getFile } = require('../controllers/upload');
const { validateJWT, validateRole } = require('../middlewares/validate-jwt');


const router = Router();

router.put('/:collection/:id', [
    validateJWT,
], uploadFile);

router.get('/:collection/:image', [
    // validateJWT
], getFile);


module.exports = router;