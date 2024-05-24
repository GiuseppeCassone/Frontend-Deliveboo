<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {

  name: 'PaymentMeth',

  data() {
    return {
      clientToken: null,
      instance: null,

      FormData:{

        customer_name: '',
        customer_lastname:'',
        customer_email:'',
        customer_address:'',
        customer_phone: '',
        order_total:localStorage.getItem('totalCartPrice') 

      }
    };
  },
  mounted() {
    this.getClientToken();
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
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        axios.post('http://127.0.0.1:8000/api/braintree/checkout', {
          paymentMethodNonce: payload.nonce
        }).then(response => {
          console.log('Payment successful!', response.data);
        }).catch(error => {
          console.error('Payment error:', error.response.data);
        });
      });
    },
    // checkout() {
    //   // const user = {
    //   //   firstName: this.user.firstName,
    //   //   lastName: this.user.lastName,
    //   //   email: this.user.email,
    //   //   address: this.user.address,
    //   //   phone: this.user.phone
    //   // };
    //   // const dishes = this.dishes; // Assuming 'dishes' is an array of dish objects
    //   // const totalCartPrice = this.totalCartPrice;

    //   // Send user, dishes, and totalCartPrice to server-side checkout
    //   // ...
    // }
  }
};



</script>

<template>

  <div>
    <form @submit.prevent="checkout">
      <div class="user-info">
        <label for="firstName">Nome:</label>
        <input type="text" id="firstName" v-model="user.firstName" required>

        <label for="lastName">Cognome:</label>
        <input type="text" id="lastName" v-model="user.lastName" required>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>

        <label for="address">Indirizzo:</label>
        <input type="text" id="address" v-model="user.address" required>

        <label for="phone">Telefono:</label>
        <input type="tel" id="phone" v-model="user.phone" required>
      </div>

      <div class="order-details">
        <ul>
          <li v-for="dish in dishes" :key="dish.id">
            {{ dish.name }} - {{ dish.price }}€
          </li>
        </ul>
        <p>Totale: {{ totalCartPrice }}€</p>
      </div>

      <button type="submit">Paga</button>
    </form>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="submitPayment()" class="button button--small button--green">Purchase</button>
  </div>

</template>

<style lang="scss"></style>