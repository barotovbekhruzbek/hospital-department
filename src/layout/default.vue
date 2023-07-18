<template>
  <div>
   <div class="main">
      <Aside></Aside>
      <div class="wrapper">
        <Header></Header>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
export default {
   emits:['success'],
  components: { Aside, Header },

}
</script>

<style lang="scss">
@import '@/styles/default.scss';
</style>