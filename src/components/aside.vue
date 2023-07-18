<template>
  <aside class="aside">
   <router-link class="logo" to="/">
      <img src="@/assets/img/logo.png" alt="">
   </router-link>
      <div class="title">MEDICINE </div>
     <nav class="nav">
         <router-link 
            v-for="item,index of links"
            :key="index" 
            :to="item.link">
            <!-- <img :src="getImg(item.icon)" alt="">  -->
                {{ item.title }}
         </router-link>
            <!-- <a class="active" href="index.html">
            <img src="./assets/img/home.svg" alt="">Bosh sahifa</a>
            
            <a class="" href="department.html">
            <img src="./assets/img/department.svg" alt="">Department</a>
            
            <a class="" href="room.html">
            <img src="./assets/img/palata.svg" alt="">Palatalar</a>
            
            <a class="" href="doctor.html">
            <img src="./assets/img/doctors.svg" alt="">Shifokorlar</a>
            
            <a class="" href="patient.html">
            <img src="./assets/img/bemor.svg" alt="">Bemorlar</a> -->

            <button @click="logout()">Chiqish</button>
        </nav>
      </aside>
</template>

<script>
export default {
   data:()=>({
      links:[
         {
            link:'/',
            title:'Bosh sahifa',
            icon:'home'
         },
         {
            link:'/department',
            title:'Bolimlar',
            icon:'department'
         },
         {
            link:'/spec',
            title:'Mutaxassisliklar',
            icon:'department'
         },
         {
            link:'/room',
            title:'Xonalar',
            icon:'palata'
         }
   ]
   }),
   methods:{
      // getImg(link){
      //    return new URl(`/src/assets/img/${link}.svg`, import.meta.url)
      // },
      logout(){
         if(confirm('Qaroringiz qatiymi')){
            this.$store.dispatch('exit')
         }
      }
   }
}
</script>

<style lang="scss">
   @import '@/styles/blocks/aside';
</style>