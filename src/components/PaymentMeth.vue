<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { store } from '../store';

export default {
  name: 'PaymentMeth',
  data() {
    return {
      store,
      clientToken: null,
      instance: null,
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
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err);
          return;
        }

        // // Assicura che tutti i piatti abbiano il campo 'id'
        // const validDishes = this.dishes.map(dish => {
        //   if (!dish.itemId) {
        //     console.error('Piatto mancante di itemId:', dish);
        //   }
        //   return {
        //     itemId: dish.itemId,
        //     itemName: dish.itemName,
        //     itemPrice: dish.itemPrice,
        //     itemQuantity: dish.itemQuantity,
        //     ItemTotalPrice: dish.ItemTotalPrice,
        //     restaurantId: dish.restaurantId,
        //   };
        // });

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
          })
          .catch(error => {
            console.error('Pagamento fallito', error.response.data);
          });
      });
    },
    increaseQuantity(index) {
      this.dishes[index].itemQuantity++;
      this.updateTotalPrice();
      this.saveCart();
    },
    decreaseQuantity(index) {
      if (this.dishes[index].itemQuantity > 1) {
        this.dishes[index].itemQuantity--;
        this.updateTotalPrice();
        this.saveCart();
      } else {
        this.removeItem(index);
      }
    },
    removeItem(index) {
      this.dishes.splice(index, 1);
      this.updateTotalPrice();
      this.saveCart();
    },
    updateTotalPrice() {
      this.FormData.order_total = this.dishes.reduce((total, item) => total + item.ItemTotalPrice * item.itemQuantity, 0).toFixed(2);
      localStorage.setItem('totalCartPrice', this.FormData.order_total);
    },
    saveCart() {
      localStorage.setItem('CartItems', JSON.stringify(this.dishes));
    },
  },
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitPayment" method="POST">
      <div class="user-info d-flex flex-column ">
        <label for="customer_name">Nome:</label>
        <input type="text" id="customer_name" name="customer_name" v-model="FormData.customer_name" required>

        <label for="customer_lastname">Cognome:</label>
        <input type="text" id="customer_lastname" name="customer_lastname" v-model="FormData.customer_lastname" required>

        <label for="customer_email">Email:</label>
        <input type="email" id="customer_email" name="customer_email" v-model="FormData.customer_email" required>

        <label for="customer_address">Indirizzo:</label>
        <input type="text" id="customer_address" name="customer_address" v-model="FormData.customer_address" required>

        <label for="customer_phone">Telefono:</label>
        <input type="tel" id="customer_phone" name="customer_phone" v-model="FormData.customer_phone" required>
      </div>

      <div class="order-details border border-1 my-3 p-3">
        <ul class="p-0 m-0">
          <li class=" list-unstyled" v-for="(dish, index) in dishes" :key="dish.itemId">
            {{ dish.itemName }} X {{ dish.itemQuantity }} = {{ (dish.ItemTotalPrice * dish.itemQuantity).toFixed(2) }}€ 
            <button type="button" @click="decreaseQuantity(index)">-</button>
            <button type="button" @click="increaseQuantity(index)">+</button>
            <button type="button" @click="removeItem(index)">Rimuovi</button>
          </li>
        </ul>
        <p>Totale: {{ FormData.order_total }}€</p>
      </div>
    </form>
    <div v-if="dishes.length > 0">
      <div id="dropin-container"></div>
      <button id="submit-button" @click="submitPayment" class="btn btn-success">Acquista</button>
    </div>
    <div v-else class=" p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
      
        Attenzione!!!
        Carrello vuoto <router-link 
                            :to="{ name: 'info-restaurant', params: {  id: store.currentIdRestaurant } }">
                            torna al ristorante precedente
                        </router-link>
    </div>
  </div>
</template>

<style lang="scss"></style>