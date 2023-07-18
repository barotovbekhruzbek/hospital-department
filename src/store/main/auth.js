import cookies from 'vue-cookies'
export const auth = {
   state:()=>({
      user:{},
      token:{}
   }),
   getters:{
      user({user}){
         return user
      },
      token({token}){
         return token
      }
   },
   mutations:{
      setUser(state,payload){
         state.user = payload
      },
      setToken(state,payload){
         state.token = payload
      }
   },
   actions:{
      async login({dispatch,commit},payload){
         let res = await dispatch('postAxios',{
            url: `auth/login`,
            data:payload
         })
         if(res?.status == 200){
            let {token,user} = res.data
            commit('setUser',user),
            commit('setToken',token),
            commit('setNotif',{
               type:'success',
               text:'Xush kelibsiz'
            }),

            cookies.set('hospital-token',token)
            cookies.set('hospital-user',user)

            commit('setLayout','def')
         }
      },
      async register({dispatch},payload){
         return await dispatch('postAxios',{
            url:'auth/reg',
            data:payload 
         })
      },
      async checkUser({dispatch,commit}){
         if(cookies.isKey('hospital-user') && cookies.isKey('hospital-token')){
            commit('setUser',cookies.get('hospital-user'))
            commit('setToken',cookies.get('hospital-token'))

            let user = cookies.get('hospital-user')
            let res = await dispatch('postAxios',{
               url: `auth/checkuser`,
               data: {
                  id: user.id
               }
            })
            if(res.status == 200){
               cookies.set('hospital-user',res.data)
               commit('setUser',res.data)
               commit('setLayout','def')
            }
         }else{
            cookies.remove('hospital-user')
            cookies.remove('hospital-token')

            commit('setLayout','auth')
         }
      },
      exit({commit}){
            cookies.remove('hospital-user')
            cookies.remove('hospital-token')

            commit('setLayout','auth')
            commit('setNotif',{
               type:'warning',
               text:'Tizimdan chiqdingiz'
         })
      }
   }
}