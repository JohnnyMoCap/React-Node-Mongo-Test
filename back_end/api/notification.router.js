const express = require('express');
const NotiInstance = require('../models/notiInstance.schema')
const NotiType = require('../models/notiType.schema')
const NotiText = require('../models/notiText.schema')
const BrowseUser = require('../models/browseUser.schema')

const router = express.Router();

//post to mongoDB a new notification type
router.post('/postNotiType',async (req,res)=>{
  try {
    let toTheDb = new NotiType({
      type_name: req.body.type_name,
      backgroundColor: req.body.backgroundColor,
      img: req.body.img
    })
    const savedAction = await toTheDb.save();
    res.status(200).json(savedAction)
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
})

//get all notiTypes from the DB
router.get('/getNotiTypes',async (req,res)=>{
  try {
    const types = await NotiType.find()
    res.status(200).send(types)
  } catch (err) {
    console.log(err)
    res.status(500).end
  }
  
})

//post a new notification text
router.post('/postNotiText',async (req,res)=>{
  try {
    const types = await NotiType.find()

    let newText = new NotiText({
      text: req.body.text,
      noti_type: types.find(type=> type.type_name===req.body.noti_type)
    })

    const savedText = await newText.save();
    res.status(200).json(savedText)

  } catch (err) {
    console.log(err)
    res.status(500).end
  }
  
})


//get all notiTexts from the DB
router.get('/getNotiText',async (req,res)=>{
  try {
    const types = await NotiText.find()
    res.status(200).send(types)
  } catch (err) {
    console.log(err)
    res.status(500).end
  }
  
})


module.exports = router;