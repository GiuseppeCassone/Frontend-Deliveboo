<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {

name: 'PaymentMeth',

  data() {
    return {
      clientToken: null,
      instance: null
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
      });
    },
    initializeDropin() {
      // dropin.create({
      //   authorization: this.clientToken,
      //   container: '#dropin-container'
      // }, (err, instance) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   this.instance = instance;
      // });
      const button = document.querySelector('#submit-button');

          braintree.dropin.create({
            authorization: 'sandbox_jy7rszf3_k2ntnrxddj6mzc6v',
            selector: '#dropin-container'
            }, function (err, instance) {
              button.addEventListener('click', function () {
                this.instance.requestPaymentMethod(function (err, payload) {
                  // Submit payload.nonce to your server
                });
              })
          });
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
    }
  }
};



</script>

<template>
    
    <div>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="submitPayment()" class="button button--small button--green">Purchase</button>
  </div>

</template>

<style lang="scss">

</style>