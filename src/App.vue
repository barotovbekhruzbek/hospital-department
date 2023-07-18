<template>
    <div>
      <component :is="layout"></component>
      <notifVue></notifVue>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import notifVue from './components/notif.vue';
import authLayout from './layout/auth.vue';
import defaultLayout from './layout/default.vue';
export default {
  components:{
    notifVue,
    'auth':authLayout,
    'def':defaultLayout,
  },
  computed:{
    ...mapGetters([
      'layout'
    ])
  },
  mounted(){
    this.$store.dispatch('checkUser')
  }

}
</script>

<style lang="scss">
@import '@/styles/style.scss'
</style>