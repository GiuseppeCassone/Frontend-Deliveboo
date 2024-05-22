<script>

import axios from 'axios';
import { router } from '../router';
import CartItem from '../components/CartItem.vue';
// import { store } from '../store';

export default {

  // store,

  name: 'InfoRestaurant',

  components: {

    // CartItem,

  },

  data() {


    return {

      // store,

      restaurant: null,

      restaurantId: null,

      apiBaseUrl: 'http://127.0.0.1:8000/api',

      apiImageUrl: 'http://127.0.0.1:8000/storage/',

      // Elementi per la gestione del carrello

      newItem: {

        dish: null,
        quantity: 0,
        TotalPrice: 0

      },



      CartItems: [],


    }
  },

  mounted() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  },

  created() {

    // recuperiamo il parametro dell'id del project dall'url
    // console.log(this.$route.params.id);

    // lo assegnamo alla variabile projectId
    this.restaurantId = this.$route.params.id;

    axios.get(this.apiBaseUrl + '/restaurant/' + this.restaurantId).then(res => {

      // console.log(res.data);

      if (res.data.success) {

        // se troviamo il project lo salviamo
        this.restaurant = res.data.result;

      } else {

        // torniamo indietro alla home
        this.$router.push({ name: 'home' });
      }

    })
  },
  methods: {
    // addToCart(product) {
    //     // Controllare se il prodotto è già nel carrello
    //     const existingItem = cart.items.find(item => item.id === product.id);

    //     if (existingItem) {
    //         // Incrementare la quantità del prodotto esistente
    //         existingItem.quantity++;
    //     } else {
    //         // Aggiungere un nuovo oggetto al carrello
    //         cart.items.push({
    //             id: product.id,
    //             title: product.title,
    //             price: product.price,
    //             quantity: 1,
    //         });
    //     }

    //     console.log(existingItem)
    //     // Aggiornare la quantità e il prezzo totali
    //     cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    //     cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    //     // Salvare il carrello in localStorage
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // },

    // addToCart(item){
    //   console.log(item)
    //   //  this.store.currentDish = item;

    //    this.store.cartItems.push(item);

    // },
    addItem(dish) {
      // this.items.push(this.newItem);
      const newItem = {
        itemId : dish.id,
        itemName: dish.name,
        itemPrice : dish.price,
        itemQuantity : 1,
        // ItemTotalPrice : itemPrice * itemQuantity,

      }

      const existingItem = this.CartItems.find(item => item.itemId === newItem.itemId);
      if (existingItem) {
        let index = this.CartItems.indexOf(newItem)
        console.log(index)
        console.log(newItem.itemQuantity)
        newItem.itemQuantity+=1;
      }
      this.CartItems.push(newItem);
      localStorage.setItem('CartItems', JSON.stringify(this.CartItems));
      console.log(newItem)
    },
    removeItem(index) {
      this.CartItems.splice(index, 1);
      localStorage.setItem('CartItems', JSON.stringify(this.CartItems));
    },

  },
  computed: {
    totalItems() {
      return this.CartItems.length;
    },
  }

}


</script>


<template>
  <div class="container">
    <div class="row my-3">
      <div class="col-12">
        <h1 class="display-2 fw-bolder m-0">{{ restaurant.name }}</h1>
        <h4>{{ restaurant.description }}</h4>
        <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img"
          class="img-fluid rounded-start card-img-top" alt="...">
      </div>
    </div>

    <div class="row d-flex justify-content-center py-5">
      <div class="col-md-7">
        <div class="card">
          <ul class="list-group list-group-flush" v-for="dish in restaurant.dishes">
            <li id="dish-menu" class="list-group-item d-flex gap-3">
              <img class="img-fluid h-100" :src="dish.img.includes('https') ? dish.img : this.apiImageUrl + dish.img"
                alt=""> <span class="align-self-center">{{ dish.name }}</span>
              <button @click="addItem(dish)" class="btn btn-primary h-50 align-self-center  ms-auto">
                Aggiungi al carrello
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            <h2>Carrello</h2>
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="(item, index) in CartItems" :key="index" class="list-group-item">
              {{ item.itemName }} {{ item.itemPrice }} {{ item.itemQuantity }}
              <button class="btn btn-danger float-end" @click="removeItem(index)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </li>
          </ul>
          <div class="card-footer">
            <p>
              Totale dei Prodotti : {{ totalItems }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'home' }" class="btn btn-primary">
      Torna ai ristoranti
    </router-link>
  </div>
</template>



<style lang="scss" scoped>
#dish-menu {
  height: 140px;
}
</style>