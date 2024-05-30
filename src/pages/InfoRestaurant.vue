<script>

import axios from 'axios';
import { router } from '../router';
import CartItem from '../components/CartItem.vue';
import { store } from '../store';

export default {

  name: 'InfoRestaurant',

  components: {

    CartItem,

  },

  data() {


    return {

      store,

      restaurant: null,

      restaurantId: null,

      apiBaseUrl: 'http://127.0.0.1:8000/api',

      apiImageUrl: 'http://127.0.0.1:8000/storage/',

    }
  },

  mounted() {
    
  },

  created() {

    // recuperiamo il parametro dell'id del project dall'url
    // lo assegnamo alla variabile projectId
    this.restaurantId = this.$route.params.id;

    axios.get(this.apiBaseUrl + '/restaurant/' + this.restaurantId).then(res => {

      // console.log(res.data);

      if (res.data.success) {

        // se troviamo il ristorante lo salviamo
        this.restaurant = res.data.result;

      } else {

        // torniamo indietro alla home
        this.$router.push({ name: 'home' });
      }

    })
  },
  methods: {
  
      // metodo che aggiunge un piatto al carrello
      addItem(dish) {
      // Verifico se il carrello contiene già elementi di un altro ristorante
      if (this.store.CartItems.length > 0 && this.store.CartItems[0].restaurantId !== dish.restaurant_id) {
        alert("Non puoi aggiungere piatti da un ristorante diverso finché non svuoti il carrello.");
        return;
      }
      // inizializzo la variabile currentDish nello store
      // con il piatto che viene passato come parametro al click del bottone 'aggiungi al carrello'
      this.store.currentDish = dish;

      this.store.currentIdRestaurant = dish.restaurant_id;
      console.log('Intendevo questo',this.store.currentIdRestaurant)
      // console.log(this.store.currentDish);
      
      // dichiaro un oggetto che prende le informazione del mio piatto
      const newItem = {
        itemId : this.store.currentDish.id,
        itemName: this.store.currentDish.name,
        itemPrice : Number(this.store.currentDish.price),
        itemQuantity : 1,
        ItemTotalPrice : Number(this.store.currentDish.price),
        restaurantId: this.restaurant.id,
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
      this.store.addToTotalCart(newItem);
    },


  },
  
  computed: {
   
  }

}


</script>


<template>
  <div class="container">
    <router-link :to="{ name: 'home' }" class="btn btn-primary btn-color mt-3">
      <i class="fa-solid fa-arrow-left"></i> Torna ai ristoranti
    </router-link>
    <div class="row my-3">
      <div class="col-12 position-relative">
        <div id="title-box" class="z-1 p-2">
          <h1 class="display-2 fw-bolder m-0">{{ restaurant.name }}</h1>
          <h4 class="fw-normal"> {{ restaurant.description }}</h4>
        </div>
        <section class="z-1 p-2">
          <div id="contact" class="d-flex flex-column justify-content-between gap-2">
            <h5 class="text-uppercase">Contatti: </h5>
            <p class="mb-0"><i class="fa-solid fa-map-location-dot"></i> {{ restaurant.address }}</p>
            <p class="mb-0"> <img class="img-fluid" src="/images/vat.svg" alt=""> {{ restaurant.vat }}</p>
            <p class="mb-0"><i class="fa-solid fa-phone"></i> {{ restaurant.phone_number }}</p>
          </div>
        </section>
        <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img"
          class="img-fluid rounded-2 card-img-top" alt="...">
      </div>
    </div>

    <div class="row d-flex justify-content-center py-5">
      <!-- COLONNA PIATTI -->
      <div class="col-md-7">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li id="dish-menu" class="row list-group-item d-flex justify-content-between align-items-center" v-for="dish in restaurant.dishes">
              <!-- Colonna per l'immagine -->
              <div class="col-4">
                <img style="max-height: 124px;" class="img-fluid h-100 w-100 object-fit-cover" :src="dish.img.includes('https') ? dish.img : this.apiImageUrl + dish.img" alt="">
              </div>
              <!-- Colonna per il nome e il prezzo -->
              <div class="col d-flex flex-column justify-content-center">
                <span class="fw-bold">{{ dish.name }}</span>
                <span>€{{ dish.price }}</span>
              </div>
              <!-- Colonna per il pulsante -->
              <div class="col d-flex align-items-center">
                <button @click="addItem(dish)" class="btn-color btn btn-primary ms-auto">
                  Aggiungi al carrello
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- COLONNA CARRELLO -->
      <CartItem></CartItem>
     
    </div>

    
  </div>
</template>



<style lang="scss" scoped>
@use '../styles/variables' as *;

// MENU

#title-box{
  background-color: rgba(0, 0, 0, 0.484);
  color: white;
  position: absolute;
  top: 0;
  left: 12px;

  border-top-left-radius: 7px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 7px;
}


section{
  color: white;
  background-color: rgba(0, 0, 0, 0.484);
  position: absolute;
  bottom: 0;
  right: 12px;
  max-width: 400px;
  min-width: 250px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 7px;

  #contact{

    img{
      height: 16px;
      width: auto;
      filter: invert(1);
    }
  }
}


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


// CARRELLO

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