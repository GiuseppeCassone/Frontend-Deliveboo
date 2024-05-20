<script>

import axios from 'axios';

export default {

    name: 'InfoRestaurant',

     props: {
        restaurant : Object,
    },

    data(){

        return {

            restaurant: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    created() {
      axios.get(this.apiBaseUrl + '/restaurant/' + this.$route.params.id).then(res => {
        this.restaurant = res.data.results
        console.log(res.data.results)
      })
    }

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
                <p class="card-text">{{ restaurant.address }}</p>
                <p v-for="typology in restaurant.typologies" class="card-text">{{ typology.type }}</p>
              </div>
            </div>
          </div>
        </div>

    </div>


</template>


<style lang="scss" scoped>

</style>