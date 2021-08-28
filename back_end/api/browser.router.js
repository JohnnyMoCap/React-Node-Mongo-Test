const express = require('express');
const NotiInstance = require('../models/notiInstance.schema')
const NotiType = require('../models/notiType.schema')
const BrowseUser = require('../models/browseUser.schema')
const NotiText = require('../models/notiText.schema')

const router = express.Router();

//creates a new browser user, called when a new client is being opened.
router.post('/createBroswerUser',async (req,res)=>{
  let timeBetweenNotifications = new Date(   (Math.floor(Math.random() * 6 + 5))*1000  );
  let notiDuration =new Date(                (Math.floor(Math.random() * 4 + 1))*1000  );

  try {
    //creates the new user on login.
    let newUser = new BrowseUser({
      clickedNotificationsIds: [],
      timeBetweenNotifications: timeBetweenNotifications,
      notiDuration: notiDuration,
    })
    const savedUser = await newUser.save();


    //create ALL notifications for the user.
    const texts = await NotiText.find()

    texts.forEach(async text => {
      let newInstance = new NotiInstance({
        notiText: text,
        repeat: true,
        clicked:false,
        browseUser: savedUser
      })  
      const savedNotiInstance = await newInstance.save();

    });

    res.status(200).json(savedUser)
    
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }


})


//updates both the browser so the instance is logged in him + changes the instances repeat and clicked values.
router.put('/updateBrowserAndInstance',async(req,res)=>{
  try {
    newInstance = req.body
    newInstance.repeat = false
    newInstance.clicked = true

    const user = await BrowseUser.find({_id:newInstance.browseUser._id})
    user[0].clickedNotificationsIds.push(newInstance._id)

    const updatedUser = await BrowseUser.updateOne({_id:newInstance.browseUser._id},{
      clickedNotificationsIds: user[0].clickedNotificationsIds
    })

    const updatedNoti = await NotiInstance.updateOne({_id:newInstance._id},newInstance);

    res.status(200)

  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
})


module.exports = router;