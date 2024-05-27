<script>

export default{

    name: 'PaymentApproved'

}

</script>

<template>

<div class="container py-5">
    
    <div class="successful">
        <i class="fa-solid fa-circle-check"></i>

        <div class="text">
            <span>Il pagamento è avvenuto con successo</span>

            <p>Riceverai presto una mail di conferma dell'ordine</p>
        </div>

        <router-link :to="{ name: 'home' }" class="btn">
            Continua con i tuoi ordini 
        </router-link>
    </div>

</div>

</template>

<style scoped lang="scss">
@use '../styles/variables.scss' as *;

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    .fa-circle-check{
        margin-bottom: 30px;

        font-size: 3em;

        color: $thirdColor;
    }

    .text{
        span {
            margin-bottom: 10px;

            font-weight: bold;
        }

        p{
            margin-bottom: 20px;

            font-size: .8em;
        }

    }

    .btn{
        border: 1px solid black;

        &:hover{
            border: 1px solid white;

            color: white;
            
            background-color: $thirdColor;
        }
    }
}

</style>