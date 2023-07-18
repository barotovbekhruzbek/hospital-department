export const notif = {
   state:()=>({
      notif:{}
   }),
   getters:{
      notif({notif}){
         return notif
      }
   },
   mutations:{
      setNotif(state,payload){
         state.notif = payload
         setTimeout(()=>{
            state.notif = {}
         },2000)
      }
   }
}