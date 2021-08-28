const mongoose = require('mongoose');

const NotiTypeSchema = mongoose.Schema({
    type_name:{
        type: String,
        required: true
    },
    backgroundColor:{
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('NotiType',NotiTypeSchema)