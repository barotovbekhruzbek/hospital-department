<template>
  <div>
   <login @successLogin="()=>{
      $emit('success')
      
   }"/>
  
  </div>
</template>

<script>

import login from '../views/login.vue'
export default {
   emits:['success'],
  components: { login },

}
</script>

<style lang="scss">
@import '@/styles/auth.scss';
</style>