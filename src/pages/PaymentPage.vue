<script>

import PaymentMeth from '../components/PaymentMeth.vue';

export default {
    name: 'PaymentPage',
    components: { PaymentMeth },
}

</script>

<template>
    <div class="container animate__animated animate__backInUp">
        
        <h1 class="my-3 p-0 text-center">Benvenuto nella pagina di pagamento </h1>
        <router-link :to="{ name: 'info-restaurant' }" class="btn btn-primary btn-color my-3">
            <i class="fa-solid fa-arrow-left"></i> Torna ai ristoranti
        </router-link>
        <PaymentMeth></PaymentMeth>

    </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.btn-color{
  background-color: $secondColor;
  border-color: $primaryColor;

  &:hover{
  background-color: $primaryColor;
  }
}


</style>

