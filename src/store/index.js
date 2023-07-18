import {createStore} from "vuex"
import { modules } from "./main/modules"

export const store = createStore({
   state:()=>({
      url:'http://95.130.227.52:3112'
   }),
   getters:{
      mainUrl(state){
         return state.url
      }
   },
   modules

})