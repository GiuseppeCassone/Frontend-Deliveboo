<script>
export default {
  name: 'AppHeader',
};
</script>

<template>
  <div class="container-fluid px-0 personal_shadow">
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img class="img-fluid w-50 personal_logo" src="/public/images/wowdelive.svg" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="http://127.0.0.1:8000/register" target="_blank" class="btn btn-light rounded-pill px-4">Collabora con noi</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.personal_shadow {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.navbar {
  padding: 1rem 0;

  background-color: $secondColor;
}

.personal_logo {
  filter: invert(1);
}

.navbar-toggler {
  border: none;
}

.nav-link {
  margin-right: 1rem;
}
</style>
