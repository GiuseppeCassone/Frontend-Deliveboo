<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { store } from '../store';
import { router } from '../router';

export default {
  name: 'PaymentMeth',

  
  data() {
    return {
      store,
      clientToken: null,
      instance: null,
      paymentSuccess: false,
      FormData: {
        customer_name: '',
        customer_lastname: '',
        customer_email: '',
        customer_address: '',
        customer_phone: '',
        order_total: localStorage.getItem('totalCartPrice') || 0,
      },
      dishes: JSON.parse(localStorage.getItem('CartItems')) || [],
    };
  },
  mounted() {
    this.getClientToken();
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

      // console.log('mounted', this.FormData.order_total);

   
  },
  methods: {
    getClientToken() {
      axios.get('http://127.0.0.1:8000/api/braintree/token')
        .then(response => {
          this.clientToken = response.data.token;
          this.initializeDropin();
        })
        .catch(error => {
          console.error('Fallita la richiesta del client token', error);
        });
    },
    initializeDropin() {
      dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container'
      }, (err, instance) => {
        if (err) {
          console.error(err);
          return;
        }
        this.instance = instance;
      });
    },

    // Funzione per il pagamento di braintree
    submitPayment() {
      this.FormData.order_total = this.store.totalCartPrice;

      const form = document.getElementById('myForm');
      console.log(form)

        // event.preventDefault(); // Evita l'invio del form

        if (!form.checkValidity()) {
          alert("Compilare tutti i campi correttamente!");
          // document.getElementById('try').innerHTML = 'ciao';
          return;
        }
        // console.log(this.FormData.order_total);
        this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        const paymentData = {
          ...this.FormData,
          paymentMethodNonce: payload.nonce,
          orderData: JSON.stringify(this.dishes.map(dish => ({
            dish_id: dish.itemId,  // Assicurati che `dish.itemId` sia corretto
            quantity: dish.itemQuantity  // Assicurati che `dish.itemQuantity` sia corretto
          }))),
        };

        console.log('Dati del pagamento inviati:', paymentData);

        axios.post('http://127.0.0.1:8000/api/braintree/checkout', paymentData)
          .then(res => {
            console.log('Pagamento avvenuto con successo', res);
            this.$router.push({name : 'payment-success'});
          })
          .catch(error => {
            console.error('Pagamento fallito', error.response.data);
          });
      });

        // Processa i dati del form (ad esempio, inviali al server)

     
    },
    increaseQuantity(index) {
      this.store.CartItems[index].itemQuantity++;
      this.store.CartItems[index].ItemTotalPrice += this.store.CartItems[index].itemPrice;
      this.store.CartItems[index].ItemTotalPrice = Number(this.store.CartItems[index].ItemTotalPrice.toFixed(2));
      localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));
      
      this.store.totalCartPrice += Number(this.store.CartItems[index].itemPrice);
      this.store.totalCartPrice = Number(this.store.totalCartPrice.toFixed(2));
      localStorage.setItem('totalCartPrice', this.store.totalCartPrice);

      console.log(this.FormData.order_total);

      this.updateTotalPrice();
    },
    decreaseQuantity(index) {
      if(this.store.CartItems[index].itemQuantity > 1) {
        // aggiorno la quantità di quel piatto nel carrello
        this.store.CartItems[index].itemQuantity--;
        // aggiorno il prezzo totale dello stesso piatto all'interno del carello
        this.store.CartItems[index].ItemTotalPrice -= this.store.CartItems[index].itemPrice;
        this.store.CartItems[index].ItemTotalPrice = Number(this.store.CartItems[index].ItemTotalPrice.toFixed(2));
        // aggiorno il prezzo totale del carrello
        this.store.totalCartPrice -= Number(this.store.CartItems[index].itemPrice);
      } else {
        // altrimenti rimuovo quel piatto dal carrello
        this.removeItem(index);
      }

      localStorage.setItem('totalCartPrice', this.store.totalCartPrice);
      localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));

      this.updateTotalPrice();
    },
    removeItem(index) {
      this.store.totalCartPrice -= Number(this.store.CartItems[index].ItemTotalPrice);
      localStorage.setItem('totalCartPrice', this.store.totalCartPrice);
      this.store.CartItems.splice(index, 1);
      localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));

      this.updateTotalPrice();
      // this.updateTotalPrice();
      // this.saveCart();
    },
    updateTotalPrice() {
      // this.FormData.order_total = this.dishes.reduce((total, item) => total + item.ItemTotalPrice * item.itemQuantity, 0).toFixed(2);
      // localStorage.setItem('totalCartPrice', this.FormData.order_total);
      // this.FormData.order_total = this.store.totalCartPrice;
    },
    saveCart() {
      localStorage.setItem('CartItems', JSON.stringify(this.dishes));
    },
  },
};
</script>

<template>
  <div class="container position-relative">
    <form @submit.prevent="submitPayment" method="POST" id="myForm">
      <div class="user-info p-2 rounded-2">
        <div class="mb-3">
          <label for="customer_name" class="form-label">Nome:</label>
          <input type="text" class="form-control" id="customer_name" name="customer_name" v-model="FormData.customer_name" required>
        </div>

        <div class="mb-3">
          <label for="customer_lastname" class="form-label">Cognome:</label>
          <input type="text" class="form-control" id="customer_lastname" name="customer_lastname" v-model="FormData.customer_lastname" required>
        </div>

        <div class="mb-3">
          <label for="customer_email" class="form-label">Email:</label>
          <input type="email" class="form-control" id="customer_email" name="customer_email" v-model="FormData.customer_email" required>
        </div>

        <div class="mb-3">
          <label for="customer_address" class="form-label">Indirizzo:</label>
          <input type="text" class="form-control" id="customer_address" name="customer_address" v-model="FormData.customer_address" required>
        </div>

        <div class="mb-3">
          <label for="customer_phone" class="form-label">Telefono:</label>
          <input type="tel" class="form-control" id="customer_phone" name="customer_phone" v-model="FormData.customer_phone" required>
        </div>
      </div>


      <div class="order-details rounded-2 my-3 p-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Piatto</th>
              <th scope="col">Quantità</th>
              <th scope="col">Prezzo Totale</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dish, index) in store.CartItems" :key="dish.itemId">
              <td>{{ dish.itemName }}</td>
              <td>{{ dish.itemQuantity }}</td>
              <td>{{ dish.itemName }} X {{ dish.itemQuantity }} = €{{ dish.ItemTotalPrice.toFixed(2) }}</td>
              <td class="d-flex gap-2">
                <button type="button" class="btn btn-success fw-bold" @click="increaseQuantity(index)"><i class="fa-solid fa-plus"></i></button>
                <button type="button" class="btn btn-success fw-bold" @click="decreaseQuantity(index)"><i class="fa-solid fa-minus"></i></button>
                <button type="button" class="btn btn-danger fw-bold" @click="removeItem(index)"><i class="fa-solid fa-trash-can"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Totale: {{ store.totalCartPrice }}€</p>
      </div>

    </form>
    <div v-if="store.CartItems.length > 0">
      <div id="dropin-container"></div>
      <button id="submit-button" @click="submitPayment" class="btn btn-success">Acquista</button>
    </div>
    <div v-else>
      <!-- Alert Bootstrap 5 -->
      <div id="alert" class="alert alert-success alert-dismissible fade show position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-center" role="alert">
        <img src="/images/cart2.png" alt="">
        <h2 class="my-3"><strong>Attenzione!!!</strong> Carrello vuoto :(</h2>
        <router-link id="link" :to="{ name: 'home' }" class="text-black text-decoration-none btn btn-info btn-lg fw-bold fs-3">
          <i class="fa-solid fa-arrow-left fa-beat me-2"></i> Torna al ristorante <i class="fa-solid fa-utensils"></i>
        </router-link>
        <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="alert" aria-label="Close"></button> -->
      </div>

    </div>
    <div id="try"></div>
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as *;

.user-info, .order-details{
  border: 3px solid $primaryColor;
}

#alert{

  width: 100%;
  height: 100%;

  img{
    filter: invert(1);
    width: auto;
    height: 200px;
  }

  #link{
    background-color: $secondColor;
    border: solid $primaryColor;
  
    &:hover{
      transition: .3 ease-in-out;
    background-color: $thirdColor;
    border: solid $primaryColor;
    }
  }

}


</style>