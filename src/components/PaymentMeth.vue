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
        order_total:localStorage.getItem('totalCartPrice'), 

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
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        axios.post('http://127.0.0.1:8000/api/braintree/checkout', this.FormData).then(res => {
          console.log(res);
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
    <form @submit.prevent="submitPayment()" method="POST">
      @csrf
      <div class="user-info">
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

      <div class="order-details">
        <ul>
          <li v-for="dish in dishes" :key="dish.id">
            {{ dish.name }} - {{ dish.price }}€
          </li>
        </ul>
        <p>Totale: {{ FormData.order_total }}€</p>
      </div>

      <button type="submit">Paga</button>
    </form>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="submitPayment()" class="button button--small button--green">Purchase</button>
  </div>

</template>

<style lang="scss"></style>