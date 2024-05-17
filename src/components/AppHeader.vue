<script>

export default {
    name: 'AppHeader',
}

</script>

<template>

  <h1 class="display-1 text-center fw-bold py-3">HOMEPAGE</h1>

  <header>
    <nav class="py-3">
      <router-link :to="{name: 'home'}" id="prova_titolo" class="container p-2">
          prova
      </router-link>
    </nav>
  </header>

</template>

<style scoped>

</style>
