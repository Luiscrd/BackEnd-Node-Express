const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({

    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },

    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

hospitalSchema.method('toJSON', function() {

    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;

}, { collection: 'Hopitals'})

module.exports = model('Hospital', hospitalSchema);