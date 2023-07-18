import { converDate } from "../../helpers/incfunc"

export const department = {
   state:()=>({
      departments:[],
      department:{},
      countDepartment:0
   }),
   getters:{
      departments({departments}){
         return departments
      },
      department({department}){
         return department
      },
      countDepartment({countDepartment}){
         return countDepartment
      },
      activeDepartments({departments}){
         return departments.filter(department =>department.status == 0)
      }
   },
   mutations:{
      setDepartments(state,payload){
         state.departments = [...payload.map(item =>{
            item.createdTime = converDate(item.createdTime)
            return item
         })]
      },
      newDepartment(state,payload){
         state.departments = [
            {...payload,createdTime:converDate(payload.createdTime)},
            ...state.departments]
      },
      updateDepartment(state,payload){
         state.departments = state.departments.map(department =>{
            if(department._id == payload._id)
               return {...payload,createdTime:converDate(payload.createdTime)}
            return department
         })
      },
      deleteDepartment(state,payload){
         state.departments = state.departments.filter(department =>{
            if(department._id == payload) return false
            return department
         })
      }
   },
   actions:{
      async getAllDepartments({dispatch,commit}){
         let res = await dispatch('getAxios','department')
         if(res.status == 200){
            commit('setDepartments',res.data)
         }
      },
      async addDepartment({dispatch,commit},payload){
         let res = await dispatch('postAxios',{
            url: 'department',
            data: payload
         })
         if(res.status == 201){
            commit('newDepartment',res.data),
            commit('setNotif',{
               type:'success',
               text:'Yangi Bolim qoshildi'
            })
         }
      },
      async deleteDepartment({dispatch,commit},payload){
         let res = await dispatch('deleteAxios',`department/${payload}`)
         if(res.status == 200){
            commit('deleteDepartment',payload)
            commit('setNotif',{
               type:'warning',
               text:'Bo`lim o`chirildi'
            })
         }  
      },
      async getDepartment({dispatch},payload){
         return await dispatch('getAxios',`department/${payload}`)
      },
      async saveDepartment({dispatch,commit},payload){
         let res = await dispatch('putAxios',{
            url:'department',
            data:payload
         })
         if(res.status == 200){
            commit('updateDepartment',res.data)
            commit('setNotif',{
               type:'success',
               text:'Malumot yangilandi'
            })

         }
      }
   }
}