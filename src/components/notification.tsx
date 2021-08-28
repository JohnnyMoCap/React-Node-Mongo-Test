import styled from 'styled-components'
import {NotificationInstance} from '../models/notiInstance.class'

//is the base for notifications to appear on.
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {store} from 'react-notifications-component'
import 'animate.css'
import { useEffect, useState } from 'react'
import {BrowserHTTP} from '../logic/browser.http'
import {NotificationHTTP} from '../logic/notifications.http'

interface Props{
    instance:NotificationInstance;//an instance of a notification with all its data as well as its browser data
    noMoreAdsFlag: Boolean;//will be true when all notifications have their "repeat" = false and "clicked"= true
}

//creates and handles every instance of a notification
const Notification = (Props:Props) => {
    const [skipOneAd, setSkipOneAd] = useState<Boolean>(false)//flag so the next notification wont render
    const data:NotificationInstance = Props.instance;
    let notiHTTP = new NotificationHTTP;
    let browserHTTP = new BrowserHTTP

    //updates when Props.instace will change state.
    useEffect(()=>{
        if(Props.instance && !skipOneAd && !Props.noMoreAdsFlag){
            NotificationAlert();
        }
        if(skipOneAd){
            setSkipOneAd(!skipOneAd)
        }
    },[Props.instance])
    
    //belongs to react-notifications-component and will render the notification.
    const NotificationAlert=()=>{
        let d = new Date(Props.instance.browseUser.notiDuration)//will decide how many seconds the notification will stay on the page
        //tells the store to render 1 notification.
        store.addNotification({
            content: notificationStracture,
            type: "success",
            container:"top-left",
            insert: "bottom",
            animationIn:["animated","fadeIn"],
            animationOut:["animated","fadeoUT"],
            dismiss:{
                duration:d.getTime(),
                showIcon: true,
            }
        })
    }

    //updates the notification instance as well as the browser + makes sure it will skip the next time an instance should be rendered.
    const removeAndSkip = async (notiInstance:NotificationInstance) =>{
        //in order to skip the next 1 time a notification should be rendered.
        setSkipOneAd(true)

        //changes the "repeat" and "clicked" values in the notification + puts the instances ID in the browser to log it was clicked.
        let retData = await browserHTTP.updateBrowser(notiInstance)
        
    }

    // jsx for the notification contents
    const notificationStracture = () => {//
        return (
            <NotificationContainer onClick={()=>{removeAndSkip(data)}}>
            <NotiParams color={data.notiText.noti_type.backgroundColor}>
                <Img src={data.notiText.noti_type.img} />
                <TextContainer>
                    <Type>{data.notiText.noti_type.type_name}</Type>
                    <Text>{data.notiText.text}</Text>
                </TextContainer>
                <Button>x</Button>
            </NotiParams>
            </NotificationContainer>
        )
    }

    //here to change out the componenet if all notifications were called.
    if(Props.noMoreAdsFlag){
        return <h1>congratulations, you defeated the evil ads</h1>
    }

    //default render of the notification
    return (
        <>
            <ReactNotification/>
        </>
    )

}

//styled components for the notification.

const Img = styled.img`
width: 50px;
height: 50px;
display: block;
margin: auto;
padding-left: 30px;
`
const Text = styled.p`
display: block;
width: 200px;
`
const Type = styled.p`
justify-content: center;
align-items:center;
display:flex;
font-weight:bold;
padding-right: 20px;
padding-left:20px;
`
const Button = styled.p`
justify-content: center;
align-items:center;
display:flex;
padding-right: 30px;
padding-left: 30px;
`

const NotiParams = styled.div`
position:relative;
background-color: ${(props)=> props.color};
display:flex;
width:100%;
`

const TextContainer = styled.div`
display:flex;
`

const NotificationContainer = styled.div`
width: fit-content;
`

export default Notification;
