<script>
import { store } from '../store';

export default{

    name: 'PaymentApproved',

    data() {
        return {
            store,

            paymentSuccess: false,
        }
    },

    created() {

        
        // localStorage.getItem('lastOrder');
        // console.log('last', this.store.lastOrder)

    },

    mounted() {

        const storedLastOrder = localStorage.getItem('lastOrder');
        if (storedLastOrder) {
            this.store.lastOrder = JSON.parse(storedLastOrder);
        }
        // console.log(this.store.lastOrder)
        
        console.log('approved', this.store.lastOrder);
        this.paymentSuccess = true;
        if(this.paymentSuccess) this.clearCart();

    },

    methods: {

        // metodo che svuota il carrello quando l'utente effettua il pagamento
        clearCart() {
            this.store.CartItems.splice(0, this.store.CartItems.length);
            localStorage.setItem('CartItems', this.store.CartItems);
            localStorage.setItem('totalCartPrice', 0);
            console.log(this.store.CartItems);

            // Salva lastOrder in localStorage
            localStorage.setItem('lastOrder', JSON.stringify(this.store.lastOrder));
        },

    },

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

        <div class="order">
            <div v-for="item in store.lastOrder" class="single-order">
                <div class="order-dish">{{ item.itemName }}</div>
                <div class="order-price">{{ item.itemPrice }}</div>
                <div class="order-quantity">{{ item.itemQuantity }}</div>
                <div class="order-total-price">{{ item.ItemTotalPrice }}</div>
            </div>
        </div>

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

        margin: 20px;

        &:hover{
            border: 1px solid white;

            color: white;
            
            background-color: $thirdColor;
        }
    }

    .order{
        padding: 10px;

        border: 1px solid black;
        border-radius: 10px;
    
        .single-order{
            display: flex;
            justify-content: space-between;
        }

    }

}

</style>