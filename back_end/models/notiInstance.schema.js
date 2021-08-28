const mongoose = require('mongoose');



const NotiInstanceSchema = mongoose.Schema({
    notiText: {type: mongoose.Schema.Types.ObjectId, ref:'NotiText'},
    repeat: {
        type: Boolean,
        required: false
    },
    clicked:{
        type: Boolean,
        required:true,
    },
    browseUser:{type: mongoose.Schema.Types.ObjectId , ref:'BrowseUser'},
})


module.exports =  mongoose.model('NotiInstance',NotiInstanceSchema)