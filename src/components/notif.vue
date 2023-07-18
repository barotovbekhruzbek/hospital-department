<template>
   <div 
   :class="
   `notif ${notif.type || ''}
    ${notif.type ? 'active' : ''}`">
      {{ notif.text }}
   </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters([
            'notif'
        ])
    }
}
</script>

<style>
   .notif{
    position: fixed;
    top: 20px;
    right: -400px;
    width: 300px;
    padding: 20px;
    z-index: 3;
    background-color:#fff;
    font-size: 18px;
    border:1px solid #e7e7e7;
    transition: all 0.3s linear;

}
.notif.active{
    right: 20px;
}
.notif.success{
    border-left: 4px solid #27AE60;
}
.notif.warning{
    border-left: 4px solid #f3ff48;
}
.notif.danger{
    border-left: 4px solid #c84d34;
}
</style>