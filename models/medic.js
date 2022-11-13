const { Schema, model } = require('mongoose');

const medicSchema = Schema({

    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },

    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },

    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

})

medicSchema.method('toJSON', function() {

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;

})

module.exports = model('Medic', medicSchema);