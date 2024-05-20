<script>

export default {
    name: 'AppHeader',
}

</script>

<template>
  <div class="container-fluid px-0">
    
    <div class="container bg-dark">
      <nav class="navbar hstack gap-3 d-flex">
        <img class="img-fluid w-50" src="/images/deliveboo_logo.png" alt="logo">
        <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="d-flex d-md-none navbar-toggler-icon fs-2"></span>
        </button>
        <a href="#" class="nav-link d-none d-md-block p-2 ms-auto text-uppercase btn btn-info fw-bold">accedi</a>
        <a href="#" class="nav-link d-none d-md-block p-2 text-uppercase btn btn-info fw-bold mt-4">registrati <br>
          <span class="text-lowercase"><small>(come ristoratore)</small></span>
        </a>
      </nav>
    </div>

  </div>



  

</template>

<style lang="scss" scoped>

</style>
