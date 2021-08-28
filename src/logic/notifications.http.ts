
export class NotificationHTTP {

    
    async getNotification(id:string){
        const url = 'http://localhost:3300/notificationAPI/getNotificationInstance/'+id;
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }

    async getNoti_types(){ 
      const url = 'http://localhost:3300/notificationAPI/getNotiTypes/';
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }


    async getNoti_texts(){
      const url = 'http://localhost:3300/notificationAPI/getNotiTypes/';
        const res = await fetch(url, {
          method:"get",
        })
        const data = await res.json()
        return data;
    }


}