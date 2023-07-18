export const layout = {
   state:()=>({
      layout:'auth'
   }),
   getters:{
      layout({layout}){
         return layout
      }
   },
   mutations:{
      setLayout(state,payload){
         state.layout = payload
      }
   } 
}