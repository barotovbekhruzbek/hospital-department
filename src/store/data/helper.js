import axios from "axios";
import cookies from 'vue-cookies'

export const helpers = {
   actions:{
      async getAxios({getters},payload){
        return await axios.get(`${getters.mainUrl}/${payload}`,{
         headers:{
            "authorization":`Bearer ${getters.token}`
            }
        })
      },
      async postAxios({getters,commit},payload){
         return await axios.post(`${getters.mainUrl}/${payload.url}`,payload.data,{
            headers:{
               "authorization":`Bearer ${getters.token}`
            }
         }).catch(e => {
            let {data,status} = e.response
            commit('setNotif',{
               type: 'danger',
               text: data
            })  
            if(status == 404){
               cookies.remove('hospital-user')
               cookies.remove('hospital-token')

               commit('setLayout','auth')
            }
            console.clear()
         })
      },
      async deleteAxios({getters},payload){
         return await axios.delete(`${getters.mainUrl}/${payload}`,{
          headers:{
             "authorization":`Bearer ${getters.token}`
             }
         })
      },
      async putAxios({getters,commit},payload){
         return await axios.put(`${getters.mainUrl}/${payload.url}`,payload.data,{
            headers:{
               "authorization":`Bearer ${getters.token}`
            }
         }).catch(e => {
            let {data,status} = e.response
            commit('setNotif',{
               type: 'danger',
               text: data
            })  
            if(status == 404){
               cookies.remove('hospital-user')
               cookies.remove('hospital-token')

               commit('setLayout','auth')
            }
            console.clear()
         })
      },
   }
}