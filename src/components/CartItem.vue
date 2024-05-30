<script>
import { store } from '../store';

export default {

    name: 'CartItem',

    props: {

    },

    data() {
        return {

         store,


        }
    },

    mounted() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
        const storedTotalPrice = localStorage.getItem('totalCartPrice');
        if (storedTotalPrice !== null) {
            this.store.totalCartPrice = Number(storedTotalPrice);
        }
        const storedCartItems = localStorage.getItem('CartItems');
        if (storedCartItems) {
            this.store.CartItems = JSON.parse(storedCartItems);
        }
        console.log(this.store.CartItems)
    },

    computed: {
         // alla creazione riporto la quantità degli elementi nel carrello
    totalItems() {
      return this.store.CartItems.length;
    },
    // alla creazione riporto il prezzo totale del carrello
    totalPrice() {
    return this.CartItems.reduce((total, item) => total + item.ItemTotalPrice, 0);
  },
    },

    methods: {
    

    },
}
</script>

<template>

     <!-- COLONNA CARRELLO -->
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            <h2>Carrello</h2>
          </div>
          <ul class="list-group list-group-flush cart">
            <li v-for="(item, index) in store.CartItems" :key="index" class="list-group-item d-flex flex-column flex-xl-row justify-content-between align-items-center row-gap-2">
              <div class="dish-info d-flex gap-3 align-self-start">
                {{ item.itemName }} <br>   <span class=" fw-light ">{{ item.itemQuantity }} x €{{ item.itemPrice }}</span> 
              </div>
              <div class="dish-options d-flex align-self-start">
                <div class="add-remove">
                  <button type="button" @click="store.removeActualDish(index)" class="btn btn-success btn-color remove"><i class="fa-solid fa-minus"></i></button>
                  <strong class="px-2">{{ item.itemQuantity }}</strong>
                  <button type="button" @click="store.addActualDish(index)" class="btn btn-success btn-color add"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="btn btn-danger float-end" @click="store.removeItem(index)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </li>
          </ul>
          <div class="card-footer">
            <p>
              Totale dei Prodotti: {{ store.CartItems.length }} <br> 
              Totale prezzo: €{{ store.totalCartPrice.toFixed(2) }}
            </p>
            <div class="checkout border-0 btn btn-primary btn-pay" v-if="store.CartItems.length > 0">
              <router-link class=" text-decoration-none" 
                :to="{ name: 'payment'}">
                <span class="text-white text-decoration-none">Procedi al pagamento</span>
              </router-link>
            </div>
            <button v-if="store.CartItems.length > 0" class="btn btn-danger" @click="store.clearCart()">Svuota il carrello</button>
          </div>
        </div>
      </div>

</template>

<style lang="scss">

// CARRELLO
@use '../styles/variables' as *;

.cart{

.dish-options{
  display: flex;
  align-items: center;
  gap: 20px;
}

}
.btn-pay{
background-color: $primaryColor;
border-bottom: $secondColor;

&:hover{
  background-color: #024849;
  border-color: $primaryColor;
}
}


</style>