const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req = request, res = response, next) => {

    const errors = validationResult(req).errors;

    if (errors.length != 0) {

        return res.status(400).json({
            ok: false,
            errors
        });

    };
    
    next();
}

module.exports = {
    validateFields
}