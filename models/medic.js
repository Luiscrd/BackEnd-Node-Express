const { Schema, model } = require('mongoose');

const medicSchema = Schema({

    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },

    hspital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospìtal'
    }
})

medicSchema.method('toJSON', function() {

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;

})

module.exports = model('Medic', medicSchema);