<template>
   <div>
       <div class="box">
          <div class="d-flex align-items-center justify-content-between">
             <div class="title">Mutaxassislik</div>
           </div>
             <table class="table">
               <thead> 
                 <th>№</th>
                 <th>Nomi</th>
                 <th>Yaratilgan vaqti</th>
                 <th> </th>
                 <th> </th>
               </thead>
               <tbody> 
                 <tr v-for="spec,index of specs" :key="spec._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ spec.title }}</td>
                    <td>{{ spec.createdTime }}</td>  
                   <td> <button @click="remove(spec._id)">X</button> </td>
                   <td> <button @click="edit(spec._id)">edit</button> </td>
                 </tr>
               </tbody>
             </table>
       </div>
       <button class="add" @click="toggle = true" >
          <img src="@/assets/img/doctors.svg" alt="">
       </button>
       <div :class="`modal ${toggle ? 'open' : ''}`"> 
       <div class="modal_box"> 
         <h4 class="text-center mb-20"> {{ editToggle ? 'Yangi bo`lim qoshish' : 'Bo`limni tahrirlash' }}</h4>
         <form id ="depart" @submit.prevent="editToggle ? add() : save()">
               <input 
               class="input" 
               name="title" 
               type="text" 
               placeholder="Bo'lim nomini kiriting"
               v-model="spec.title"
               @keypress.enter="editToggle ? add() : save()"
               >
         </form>
         <div class="modal_footer mt-20">
           <button class="btn danger" @click="clear()">Bekor qilish</button>
           <button class="btn success btn_add" v-if="editToggle" @click="add()">Kiritish</button>
           <button class="btn success" v-else @click="save( )">Saqlash</button>
         </div>
       </div>
     </div>
    
   </div>
 </template>
 
 <script>
 import { mapActions, mapGetters } from 'vuex';
 export default {
    data:()=>({
       toggle:false,
       editToggle:true,
       spec:{},
       token:'',
       notif:{}
    }),
    computed: {
       ...mapGetters([
          'specs'
       ]
       )
    },
    methods:{
       ...mapActions([
       'getAllSpecs',
       'addSpec',
       'deleteSpec',
      'getSpec',
      'saveSpec'
       ]),
       async add(){
          if(this.spec.title){
             this.addSpec(this.spec)
             this.clear()
          }
          else{
             this.$store.commit('setNotif',{
                type:'warning',
                text:'Bolim nomini kiriting'
             })
          }
       },
       async save(){
         this.saveSpec(this.spec)
         this.clear()
         },
         async edit(id){
            let res =  await this.getSpec(id)
            if(res.status == 200){
            this.spec = {...res.data}
            this.toggle = true
            this.editToggle = false
            }
         },
       remove(id){
          if(confirm('Qaroringiz qattiymi')){
             this.deleteSpec(id)
          }
       },
       clear(){
          this.toggle = false,
          this.spec = {}
          this.editToggle = true
       }
    },
    mounted(){
       this.getAllSpecs()
    }
 };
 </script>
 
 <style>
 
 </style>