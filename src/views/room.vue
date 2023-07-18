<template>
   <div>
       <div class="box">
          <div class="d-flex align-items-center justify-content-between">
             <div class="title">Xonalar</div>
           </div>
             <table class="table">
               <thead> 
                 <th>№</th>
                 <th>Xona raqami</th>
                 <th>Bo'lim</th>
                 <th>Sig'im</th>
                 <th>Yaratilgan vaqti</th>
                 <th> </th>
                 <th> </th>
               </thead>
               <tbody> 
                 <tr v-for="room,index of rooms" :key="room._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ room.number }}</td>
                    <td>{{ room.department }}</td>
                    <td>{{ room.maxcount }}</td>
                    <td>{{ room.createdTime }}</td>  
                   <td> <button @click="remove(room._id)">X</button> </td>
                   <td> <button @click="edit(room._id)">edit</button> </td>
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
         <form  @submit.prevent="editToggle ? add() : save()">
               <input 
               class="input mb-10" 
               name="title" 
               type="number" 
               placeholder="Xona raqamini kiriting"
               v-model="room.number"
               @keypress.enter="editToggle ? add() : save() "
               >
               <input 
               class="input mb-10" 
               name="title" 
               type="number" 
               placeholder="Nechi kishilik xona kiriting"
               v-model="room.maxcount"
               @keypress.enter="editToggle ? add() : save() "
               >
               <select class="input" v-model="room.department">
                  <option value="">Ro'yhatdan tanlang</option>
                  <option
                   v-for="department of departments" :key="department._id" 
                  :value="department._id">
                     {{ department.title }}
                  </option>
               </select>
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
       room:{
         department:''
       }
    }),
    computed: {
       ...mapGetters([
          'rooms',
          'departments'
       ]
       )
    },
    methods:{
       ...mapActions([
       'getAllRooms',
       'addRoom',
       'deleteRoom',
       'getRoom',
       'saveRoom',
       'getAllDepartments'
       ]),
       async add(){
          if(this.room.number&& this.room.maxcount && this.room.department){
             this.addRoom(this.room)
             this.clear()
          }
          else{
             this.$store.commit('setNotif',{
                type:'warning',
                text:'Maydonlarni toldiring'
             })
          }
       },
       async save(){
          this.saveRoom(this.room)
          this.clear()
       },
       async edit(id){
          let res =  await this.getRoom(id)
          if(res.status == 200){
            this.room = {...res.data}
            this.room.department = this.room?.department?._id
            this.toggle = true
            this.editToggle = false
          }
       },
       remove(id){
          if(confirm('Qaroringiz qattiymi')){
             this.deleteRoom(id)
          }
       },
       clear(){
          this.toggle = false,
          this.room = {
            department:''
          }
          this.editToggle = true
       }
    },
    mounted(){
       this.getAllRooms()
       this.getAllDepartments()
    }
 };
 </script>
 
 <style>
 
 </style>