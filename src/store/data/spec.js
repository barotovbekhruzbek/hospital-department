import { converDate } from "../../helpers/incfunc"

export const spec = {
   state:()=>({
      specs:[],
      spec:{},
      countSpec:0
   }),
   getters:{
      specs({specs}){
         return specs
      },
      spec({spec}){
         return spec
      },
      countSpec({countSpec}){
         return countSpec
      },
      activeSpecs({specs}){
         return specs.filter(spec =>spec.status == 0)
      }
   },
   mutations:{
      setSpecs(state,payload){
         state.specs = [...payload.map(item =>{
            item.createdTime = converDate(item.createdTime)
            return item
         })]
      },
      newSpec(state,payload){
         state.specs = [
            {...payload,createdTime:converDate(payload.createdTime)},
            ...state.specs]
      },
      updateSpec(state,payload){
         state.specs = state.specs.map(spec =>{
            if(spec._id == payload._id)
               return {...payload,createdTime:converDate(payload.createdTime)}
            return spec
         })
      },
      deleteSpec(state,payload){
         state.specs = state.specs.filter(spec =>{
            if(spec._id == payload) return false
            return spec
         })
      }
   },
   actions:{
      async getAllSpecs({dispatch,commit}){
         let res = await dispatch('getAxios','spec')
         if(res.status == 200){
            commit('setSpecs',res.data)
         }
      },
      async addSpec({dispatch,commit},payload){
         let res = await dispatch('postAxios',{
            url: 'spec',
            data: payload
         })
         if(res.status == 201){
            commit('newSpec',res.data),
            commit('setNotif',{
               type:'success',
               text:'Yangi mutaxassislik qoshildi'
            })
         }
      },
      async deleteSpec({dispatch,commit},payload){
         let res = await dispatch('deleteAxios',`spec/${payload}`)
         if(res.status == 200){
            commit('deleteSpec',payload)
            commit('setNotif',{
               type:'warning',
               text:'Mutaxassislik o`chirildi'
            })
         }
         
      },
      async getSpec({dispatch},payload){
         return await dispatch('getAxios',`spec/${payload}`)
      },
      async saveSpec({dispatch,commit},payload){
         let res = await dispatch('putAxios',{
            url:'spec',
            data:payload
         })
         if(res.status == 200){
            commit('updateSpec',res.data)
            commit('setNotif',{
               type:'success',
               text:'Malumot yangilandi'
            })

         }
      }
   }
}