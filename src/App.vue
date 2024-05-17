<script>

import AppHeader from './components/AppHeader.vue'

export default {
  data() {
    return {

    }
  },

  components: {
    AppHeader
  }

}

</script>

<template>
  <AppHeader></AppHeader>

  <div class="container py-5">
    
    <router-view></router-view>

  </div>
   
</template>

<style scoped>

</style>
