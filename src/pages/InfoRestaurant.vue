<script>

import axios from 'axios';
import { router } from '../router';
import CartItem from '../components/CartItem.vue';
import { store } from '../store';

export default {

  name: 'InfoRestaurant',

  components: {

    // CartItem,

  },

  data() {


    return {

      store,

      restaurant: null,

      restaurantId: null,

      apiBaseUrl: 'http://127.0.0.1:8000/api',

      apiImageUrl: 'http://127.0.0.1:8000/storage/',

      // Elementi per la gestione del carrello
      // CartItems: [],
      totalCartPrice: 0,
      dishCounter: 1,



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
    // metodo che aggiorna il prezzo totale nel carrello quando viene aggiunto un piatto
    addToTotalCart(item) {
      this.totalCartPrice += Number(item.itemPrice);
      this.totalCartPrice = Number(this.totalCartPrice.toFixed(2))
    },

    // metodo che aggiorna il prezzo totale nel carrello quando viene rimosso un piatto
    removeFromToTotalCart(index) {
      this.totalCartPrice -= Number(this.store.CartItems[index].ItemTotalPrice);
    },

    // metodo che aggiunge un piatto al carrello
    addItem(dish) {

      // inizializzo la variabile currentDish nello store
      // con il piatto che viene passato come parametro al click del bottone 'aggiungi al carrello'
      this.store.currentDish = dish;
      // console.log(this.store.currentDish);
      
      // dichiaro un oggetto che prende le informazione del mio piatto
      const newItem = {
        itemId : this.store.currentDish.id,
        itemName: this.store.currentDish.name,
        itemPrice : Number(this.store.currentDish.price),
        itemQuantity : 1,
        ItemTotalPrice : Number(this.store.currentDish.price),
      }

      // controllo se il piatto esiste già all'interno del carrello
      const existingItem = this.store.CartItems.find(item => item.itemId === newItem.itemId);
      // se esiste
      if (existingItem) {
        // aumento la quantità
        existingItem.itemQuantity++;
        // aggiorno il prezzo totale dello stesso piatto all'interno del carello
        existingItem.ItemTotalPrice += existingItem.itemPrice;
        existingItem.ItemTotalPrice = Number(existingItem.ItemTotalPrice.toFixed(2));

      } else {
        // altrimenti aggiungo il nuovo piatto al carrello
        this.store.CartItems.push(newItem);

      }
      localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));
      // console.log(newItem)
      // aggiorno il prezzo totale del carrello
      this.addToTotalCart(newItem);
    },

    // metodo che rimuove tutta la quantità di uno stesso piatto
    removeItem(index) {
      // console.log(this.CartItems[index])
      // aggiorno il prezzo totale del carrello
      this.removeFromToTotalCart(index);
      this.store.CartItems.splice(index, 1);
      localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));
    },

    // metodo che aggiunge un singolo piatto già presente nel carrello
    addActualDish(index) {
      // aggiorno la quantità di quel piatto nel carrello
      this.store.CartItems[index].itemQuantity++;
      // aggiorno il prezzo totale dello stesso piatto all'interno del carello
      this.store.CartItems[index].ItemTotalPrice += this.store.CartItems[index].itemPrice;
      this.store.CartItems[index].ItemTotalPrice = Number(this.store.CartItems[index].ItemTotalPrice.toFixed(2));
      // aggiorno il prezzo totale del carrello
      this.addToTotalCart(this.store.CartItems[index]);
    },

    // metodo che rimuove un singolo piatto già presente nel carrello
    removeActualDish(index) {
      // controllo se la quantità di quel piatto nel carrello
      // è maggiore di 1
      if(this.store.CartItems[index].itemQuantity > 1) {
        // aggiorno la quantità di quel piatto nel carrello
        this.store.CartItems[index].itemQuantity--;
        // aggiorno il prezzo totale dello stesso piatto all'interno del carello
        this.store.CartItems[index].ItemTotalPrice -= this.store.CartItems[index].itemPrice;
        this.store.CartItems[index].ItemTotalPrice = Number(this.store.CartItems[index].ItemTotalPrice.toFixed(2));
        // aggiorno il prezzo totale del carrello
        this.totalCartPrice -= Number(this.store.CartItems[index].itemPrice);
      } else {
        // altrimenti rimuovo quel piatto dal carrello
        this.removeItem(index);
      }
    },

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
  }

}


</script>


<template>
  <div class="container">
    <router-link :to="{ name: 'home' }" class="btn btn-primary btn-color mt-3">
      <i class="fa-solid fa-arrow-left"></i> Torna ai ristoranti
    </router-link>
    <div class="row my-3">
      <div class="col-12">
        <h1 class="display-2 fw-bolder m-0">{{ restaurant.name }}</h1>
        <h4>{{ restaurant.description }}</h4>
        <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img"
          class="img-fluid rounded-2 card-img-top" alt="...">
      </div>
    </div>

    <div class="row d-flex justify-content-center py-5">
      <div class="col-md-7">
        <div class="card">
          <ul class="list-group list-group-flush" v-for="dish in restaurant.dishes">
            <li id="dish-menu" class="list-group-item d-flex gap-3">
              <img class="img-fluid h-100" :src="dish.img.includes('https') ? dish.img : this.apiImageUrl + dish.img"
                alt=""> <span class="align-self-center">{{ dish.name }} {{ dish.price }}€</span>
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
            <li v-for="(item, index) in store.CartItems" :key="index" class="list-group-item">
              <div class="dish-info">
                {{ item.itemName }}    €{{ item.ItemTotalPrice }}
              </div>
              <div class="dish-options">
                <div class="add-remove">
                  <button type="button" @click="removeActualDish(index)" class="btn btn-success btn-color remove"><i class="fa-solid fa-minus"></i></button>
                  <strong class="px-2">{{ item.itemQuantity }}</strong>
                  <button type="button" @click="addActualDish(index)" class="btn btn-success btn-color add"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="btn btn-danger float-end" @click="removeItem(index)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </li>
          </ul>
          <div class="card-footer">
            <p>
              Totale dei Prodotti: {{ totalItems }} <br> 
              Totale prezzo: €{{ totalCartPrice.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>



<style lang="scss" scoped>
@use '../styles/variables' as *;


#dish-menu {
  height: 140px;
}
.btn-color{
  background-color: $secondColor;
  border-color: $primaryColor;

  &:hover{
  background-color: $primaryColor;
  }
}

.list-group{

  li{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dish-options{
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

}
</style>