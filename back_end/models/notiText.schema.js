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


const NotiTextSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        noti_type:{
            type: NotiTypeSchema,
            required:true
        },
    }
)



module.exports = mongoose.model('NotiText',NotiTextSchema)