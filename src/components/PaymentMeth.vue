<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import {store} from '../store';

export default {

  name: 'PaymentMeth',

  data() {
    return {
      store,

      clientToken: null,
      instance: null,

      FormData:{

        customer_name: '',
        customer_lastname:'',
        customer_email:'',
        customer_address:'',
        customer_phone: '',
        order_total:localStorage.getItem('totalCartPrice'),


      },

      actualDishes: JSON.parse(localStorage.getItem('CartItems')) || [],
    };
  },
  mounted() {
    this.getClientToken();
    
    const savedCartItems = localStorage.getItem('CartItems');
    if (savedCartItems) {
      this.store.CartItems = JSON.parse(savedCartItems);
    }
  },
  methods: {
    getClientToken() {
      axios.get('http://127.0.0.1:8000/api/braintree/token').then(response => {
        this.clientToken = response.data.token;
        this.initializeDropin();
      }).catch(error => {
        console.error('Fallita la richiesta del client token', error);
      });
    },
    initializeDropin() {
      dropin.create({
        authorization: this.clientToken,
        // authorization: 'sandbox_jy7rszf3_k2ntnrxddj6mzc6v',
        container: '#dropin-container'
      }, (err, instance) => {
        if (err) {
          console.error(err);
          return;
        }
        this.instance = instance;
      });
      // const button = document.querySelector('#submit-button');

      //     braintree.dropin.create({
      //       authorization: this.clientToken,
      //       selector: '#dropin-container'
      //       }, function (err, instance) {
      //         button.addEventListener('click', () => {
      //           this.instance.requestPaymentMethod(function (err, payload) {
      //             // Submit payload.nonce to your server
      //           });
      //         })
      //     });
    },
    submitPayment() {

      if (!this.FormData.customer_name || !this.FormData.customer_lastname || !this.FormData.customer_email || !this.FormData.customer_address || !this.FormData.customer_phone) {
        console.error('Tutti i campi utente sono obbligatori.');
        return;
      }

      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Nonce ricevuto:', payload.nonce);

        const paymentData = {
          ...this.FormData,
          paymentMethodNonce: payload.nonce,
          orderData: JSON.stringify(this.actualDishes.map(dish => ({
            dish_id: dish.itemId,  // Assicurati che dish.itemId sia corretto
            quantity: dish.itemQuantity  // Assicurati che dish.itemQuantity sia corretto
          }))),
          // orderData: JSON.stringify(this.actualDishes),
        }

        console.log('Dati del pagamento:', paymentData);

        axios.post('http://127.0.0.1:8000/api/braintree/checkout', paymentData).then(res => {
          console.log('Pagamento avvenuto con successo', res);
        })
        .catch(error => {
          // console.error('Pagamento Fallito', error.response.data);
          console.error('Pagamento fallito:', error.response ? error.response.data : error.message);
        });
        // axios.post('http://127.0.0.1:8000/api/braintree/checkout', {
        //   paymentMethodNonce: payload.nonce,
        //   // customerData: this.FormData
        // }).then(response => {
        //   console.log('Payment successful!', response.data);
        // }).catch(error => {
        //   console.error('Payment error:', error.response.data);
        // });
      });
    },
    // addDish(dish) {
    //   this.store.CartItems.push(dish);
    //   localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));
    // },
    // updateDish(dish) {
    //   // logica per aggiornare il piatto
    //   localStorage.setItem('CartItems', JSON.stringify(this.store.CartItems));
    // },
    
  }
};



</script>

<template>

  <div class="container ">
    <form @submit.prevent="submitPayment()" method="POST">
      
      <div class="user-info d-flex flex-column">
        <label for="customer_name">Nome:</label>
        <input type="text" id="customer_name" name="customer_name" v-model="FormData.customer_name" required>

        <label for="customer_lastname">Cognome:</label>
        <input type="text" id="customer_lastname" name="customer_lastname" v-model="FormData.customer_lastname" required>

        <label for="customer_email">Email:</label>
        <input type="customer_email" id="email" name="customer_email" v-model="FormData.customer_email" required>

        <label for="customer_address">Indirizzo:</label>
        <input type="text" id="customer_address" name="customer_address" v-model="FormData.customer_address" required>

        <label for="customer_phone">Telefono:</label>
        <input type="tel" id="customer_phone" name="customer_phone" v-model="FormData.customer_phone" required>
      </div>

      <div class="order-details border border-2 rounded-2 my-3">
        <h3>Riassunto dei tuoi Ordini</h3>
        <ul class="m-0 p-2">
          <li class=" list-unstyled " v-for="actualDishes in this.store.CartItems" :key="actualDishes.id">
            {{ actualDishes.itemName }} X {{ actualDishes.itemQuantity }} = {{ actualDishes.ItemTotalPrice }}€
          </li>
        </ul>
        <p>Totale: {{ FormData.order_total }}€</p>
      </div>

      <!-- <button type="submit">Paga</button> -->
    </form>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="submitPayment()" class="button button--small button--green">Purchase</button>
  </div>

</template>

<style lang="scss">
</style>