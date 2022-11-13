const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/upload');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.put('/:colection/:id', [
    validateJWT
], uploadFile);

module.exports = router;