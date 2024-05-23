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
      axios.get('/braintree/token').then(response => {
        this.clientToken = response.data.token;
        this.initializeDropin();
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
    submitPayment() {
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }
        axios.post('/braintree/checkout', {
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

var button = document.querySelector('#submit-button');

braintree.dropin.create({
  authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
  selector: '#dropin-container'
}, function (err, instance) {
  button.addEventListener('click', function () {
    instance.requestPaymentMethod(function (err, payload) {
      // Submit payload.nonce to your server
    });
  })
});

</script>

<template>
    
    <div>
    <div id="dropin-container"></div>
    <button @click="submitPayment" class="button button--small button--green">Purchase</button>
  </div>

</template>

<style lang="scss">

</style>