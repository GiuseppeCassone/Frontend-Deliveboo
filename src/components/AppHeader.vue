<script>
export default {
  name: 'AppHeader',
};
</script>

<template>
  <div class="container-fluid px-0">
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img class="img-fluid w-50" src="/public/images/deliveboo_logo.png" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link text-uppercase btn btn-outline-warning fw-bold">Accedi</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-uppercase btn btn-outline-warning fw-bold mt-md-0 mt-3">
                Registrati 
                <span class="text-lowercase"><small>(come ristoratore)</small></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">

.navbar {
  padding: 1rem 0;
}

.navbar-toggler {
  border: none;
}

.nav-link {
  margin-right: 1rem;
}
</style>
