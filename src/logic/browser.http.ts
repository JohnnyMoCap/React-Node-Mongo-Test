import {NotificationInstance} from '../models/notiInstance.class'



export class BrowserHTTP {
    
    //creates a new browser user, called when a new client is being opened.
    async getBrowserData(){
        const url = "http://.netlify/functions/browserAPI/createBroswerUser"
        const res = await fetch(url, {
          method:"post",
        })
        const data = await res.json()
        return data;
    }

    //updates both the browser so the instance is logged in him + changes the instances repeat and clicked values.
    async updateBrowser(notiInstance:NotificationInstance){
        const  url = "http://.netlify/functions/browserAPI/updateBrowserAndInstance"
        const res = await fetch(url,{
            method:"put",
            headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(notiInstance)
        });
        const data = await res.json()
        return data;
    }



}