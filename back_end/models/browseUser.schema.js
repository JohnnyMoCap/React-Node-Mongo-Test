const mongoose = require('mongoose');



const BrowseUserSchema = mongoose.Schema(
    {
        timeBetweenNotifications: Date,
        notiDuration: Date,
        clickedNotificationsIds:[String],
    },
    {timestamps:true}


)

module.exports = mongoose.model('BrowseUser',BrowseUserSchema)