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
        <PaymentMeth></PaymentMeth>

    </div>
</template>

<style scoped lang="scss">

</style>

