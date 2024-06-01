<script>

export default {

    name: 'PaymentFailed',

    data() {
       
    },

    mounted() {

        

    },

    methods: {

       

    },

}

</script>

<template>

<div class="container py-5">

<div class="successful">
    <i class="fa-solid fa-circle-xmark"></i>

    <div class="text">
        Il pagamento è fallito
    </div>

    <router-link :to="{ name: 'home' }" class="btn">
        Torna al ristorante
    </router-link>
    
</div>

</div>
  
</template>

<style scoped lang="scss">

@use '../styles/variables.scss' as *;

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    .fa-circle-xmark {
        margin-bottom: 30px;

        font-size: 3em;

        color: $thirdColor;
    }

    .text {
        span {
            margin-bottom: 10px;

            font-weight: bold;
        }
    }

    .btn {
        border: 1px solid black;

        margin: 20px;

        &:hover {
            border: 1px solid white;

            color: white;

            background-color: $thirdColor;
        }
    }

}
</style>