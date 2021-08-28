const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors:{origin:{origin:"*"}}})//used for constant communication with the front end. here used to send notifications on intervals.
const NotiInstance = require('./models/notiInstance.schema')
const TextConditions = require('./logic/textConditions')
require('dotenv/config')

let TextChanger = new TextConditions;


const notificationAPI = require('./api/notification.router')
const broswerAPI = require('./api/browser.router')

let port = 3300
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set API routes.
app.use('/notificationAPI', notificationAPI);
app.use('/browserAPI', broswerAPI);

app.get("/", (req,res) => {
    res.send("api works")
  })

  server.listen(port, () => {
    console.log(`app listening`)
  })

  //start a connection to the client
  //used to send notifications on an interval.
io.on("connection", socket=>{

  socket.on('notificationsStart',(browserData)=>{
    
    if(browserData){
      let d = new Date(browserData.timeBetweenNotifications)
      let interval = d.getTime()

      //do interval of every x seconds to emit back
      setInterval(async () => {
        try{
          let browserId = browserData._id
          //get all notification instances created for that browser ID
          const notifications = await NotiInstance.find({browseUser:[browserId]})
          .populate('browseUser')
          .populate('notiText')

          // if any notification is clicked or has its "repeat" on false remove it from the array
          const avalibleNoti = notifications.filter(noti=> noti.repeat && !noti.clicked)

          //if there are avalible notifications send a random one to the client
          if(avalibleNoti.length > 0){

            //pick one that has repeat on it
            let randomIndex = Math.floor(Math.random() * avalibleNoti.length)
            let pickedNotification = avalibleNoti[randomIndex]

            //processes the text through a series of changes relavent to it.
            pickedNotification.notiText.text = TextChanger.textChange(pickedNotification.notiText.text)

            //send to the client the picked notification.
            socket.emit('recievedNotification',pickedNotification)

            } else {//if there is no avalible notification tell the client to stop the connection and change its component
              socket.emit('recievedNotification',{noMoreAdsFlag: true})
              }
        } catch (err) {
        console.log(err)
        }
      }, interval);
    }
  })

})

//connection to the mongoDB.
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true }, ()=>{
    console.log("connected to db")
});