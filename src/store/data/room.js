import { converDate } from "../../helpers/incfunc"

export const room = {
   state:()=>({
      rooms:[],
      room:{},
      countRoom:0
   }),
   getters:{
      rooms({rooms}){
         return rooms
      },
      room({room}){
         return room
      },
      countRoom({countRoom}){
         return countRoom
      },
      activeRooms({rooms}){
         return rooms.filter(room =>room.status == 0)
      }
   },
   mutations:{
      setRooms(state,payload){
         state.rooms = [...payload.map(item =>{
            item.createdTime = converDate(item.createdTime)
            return item
         })]
      },
      newRoom(state,payload){
         state.rooms = [
            {...payload,createdTime:converDate(payload.createdTime)},
            ...state.rooms]
      },
      updateRoom(state,payload){
         state.rooms = state.rooms.map(room =>{
            if(room._id == payload._id)
               return {...payload,createdTime:converDate(payload.createdTime)}
            return room
         })
      },
      deleteRoom(state,payload){
         state.rooms = state.rooms.filter(room =>{
            if(room._id == payload) return false
            return room
         })
      }
   },
   actions:{
      async getAllRooms({dispatch,commit}){
         let res = await dispatch('getAxios','room')
         if(res.status == 200){
            commit('setRooms',res.data)
         }
      },
      async addRoom({dispatch,commit},payload){
         let res = await dispatch('postAxios',{
            url: 'room',
            data: payload
         })
         if(res.status == 201){
            commit('newRoom',res.data),
            commit('setNotif',{
               type:'success',
               text:'Yangi Xona qoshildi'
            })
         }
      },
      async deleteRoom({dispatch,commit},payload){
         let res = await dispatch('deleteAxios',`room/${payload}`)
         if(res.status == 200){
            commit('deleteRoom',payload)
            commit('setNotif',{
               type:'warning',
               text:'Xona o`chirildi'
            })
         }  
      },
      async getRoom({dispatch},payload){
         return await dispatch('getAxios',`room/${payload}`)
      },
      async saveRoom({dispatch,commit},payload){
         let res = await dispatch('putAxios',{
            url:'room',
            data:payload
         })
         if(res.status == 200){
            commit('updateRoom',res.data)
            commit('setNotif',{
               type:'success',
               text:'Malumot yangilandi'
            })

         }
      }
   }
}