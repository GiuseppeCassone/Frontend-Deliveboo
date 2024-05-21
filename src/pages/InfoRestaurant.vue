<script>

import axios from 'axios';
import { router } from '../router';

export default {

    name: 'InfoRestaurant',

    data(){

        return {

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
                  <li v-for="dish in restaurant.dishes">
                    <span>{{ dish.name }}</span>
                    <span class="w-25"><img class="w-100" :src="dish.img.includes('https') ? dish.img : this.apiImageUrl + dish.img" alt=""></span>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>

        <router-link :to="{ name: 'home' }" class="btn btn-primary">
          Torna ai ristoranti
        </router-link>

    </div>


</template>


<style lang="scss" scoped>

</style>