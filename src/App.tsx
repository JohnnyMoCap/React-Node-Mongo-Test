import { useEffect,useState } from 'react';
import './App.css';
import Notification from './components/notification'
import {BrowseUser} from './models/browseUser.class'
import {BrowserHTTP} from './logic/browser.http'
import { io } from "socket.io-client";
import {NotificationInstance} from './models/notiInstance.class'
const App = () => {


  const [browserData,setBrowserData] =useState<BrowseUser>()//will hold the browser data unique it its own instance.
  const [socket, setSocket] = useState(io('http://localhost:3300')) // will connect to the backend to get notifications in intervals.
  const [NotificationInstance,setNotificationInstance] =useState<NotificationInstance>()//the instance of 1 notification that will be presented in <Notification>
  const [noMoreAds,setnoMoreAdsFlag] = useState<boolean>(false)//will be true when all notifications have their "repeat" = false and "clicked"= true
  let browserHTTP = new BrowserHTTP

  const [flag,setFlag] = useState<boolean>(false)//dont worry about it :)

  useEffect(() =>{
    
    const FetchbrowserData = (async() => {
      let temp:BrowseUser = await browserHTTP.getBrowserData()
        if(temp != undefined){
          setBrowserData(temp)}
    })();
  },[])


  //updates when browserData will change state.
  //starts the intervals for notifications, handles its state and updates the notification.
  useEffect(()=>{
    //tells the server to start sending notifications on intervals 
    socket.emit('notificationsStart',browserData)
    
    //gets the notifications from the server on interval.
    socket.on('recievedNotification', (data)=>{
      //if all ads are non repeating disable the connection.
      if(data.noMoreAdsFlag){
        setnoMoreAdsFlag(data.noMoreAdsFlag)
        socket.disconnect();
      }
      //set the state of the notification to be the new notification, which will display it in <Notification>
      setNotificationInstance(data)
    })
  
  },[browserData])



  const pleaseClickMe = () =>{
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    setFlag(!flag)
  }


  return (
    <>
    <Notification instance={NotificationInstance} noMoreAdsFlag={noMoreAds}/>
    <div className="extras">
      {flag ? (
        <img id="totallyNotASecretImage" src="https://images.gr-assets.com/hostedimages/1504965283ra/23852869.gif" />
      ) : (
        <img id="veryPrettyLogo" src="https://media-exp1.licdn.com/dms/image/C4D0BAQHsD236SMAGpg/company-logo_200_200/0/1583248776140?e=2159024400&v=beta&t=k2doUt1xthPD7z871V-Ed-OvKUxjHZeXwBElMQeb2Rc"/>
      )}
    <button id="TheMcButton" onClick={pleaseClickMe}>magical portal to the art of the brain</button>
    </div>
    </>
  );
}

export default App;
