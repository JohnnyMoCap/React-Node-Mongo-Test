
export class NotificationHTTP {

    
    async getNotification(id:string){
        const url = 'http://.netlify/functions/notificationAPI/getNotificationInstance/'+id;
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }

    async getNoti_types(){ 
      const url = 'http://.netlify/functions/notificationAPI/getNotiTypes/';
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }


    async getNoti_texts(){
      const url = 'http://.netlify/functions/notificationAPI/getNotiTypes/';
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }


}