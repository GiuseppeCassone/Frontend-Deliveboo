<script>

import axios from 'axios';
import { router } from '../router';
import CartItem from '../components/CartItem.vue';
import { store } from '../store';

export default {

    store,

    name: 'InfoRestaurant',

    components:{

      CartItem,

    },

    data(){


        return {

          store,

          restaurant: null,

          restaurantId: null,

          apiBaseUrl: 'http://127.0.0.1:8000/api',

          apiImageUrl: 'http://127.0.0.1:8000/storage/',

        }
    },

    created() {

      // recuperiamo il parametro dell'id del project dall'url
      // console.log(this.$route.params.id);
      
      // lo assegnamo alla variabile projectId
      this.restaurantId = this.$route.params.id;
      
        axios.get(this.apiBaseUrl + '/restaurant/' + this.restaurantId).then(res => {
          
          // console.log(res.data);

          if(res.data.success){

          // se troviamo il project lo salviamo
          this.restaurant = res.data.result;

          } else {

          // torniamo indietro alla home
          this.$router.push({name: 'home'});
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

        addToCart(item){
          console.log(item)
          //  this.store.currentDish = item;

           this.store.cartItems.push(item);
           
        },

    },

}


</script>


<template>
    <div class="row d-flex justify-content-center py-5">

        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img" class="img-fluid rounded-start card-img-top" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{restaurant.name}}</h5>
                <p class="card-text">{{restaurant.description}}</p>
                <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                <ul>
                  <li class=" list-unstyled" v-for="dish in restaurant.dishes">
                    <span>{{ dish.name }}</span>
                    <span class="w-25"><img class="w-100" :src="dish.img.includes('https') ? dish.img : this.apiImageUrl + dish.img" alt=""></span>
                    <button class="btn btn-primary" @click="addToCart(dish)">Add to Cart</button>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>

        
      </div>

      <CartItem></CartItem>
      
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        Torna ai ristoranti
      </router-link>

</template>


<style lang="scss" scoped>

</style>