<script>

import axios from 'axios';

export default {

    name: 'InfoRestaurant',

     props: {
        restaurant : Object,
    },

    data(){

        return {

            // restaurant: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    mounted() {
        axios.get(this.apibaseUrl + '/restaurant').then(res => {
            
        })
    }

}


</script>


<template>
    <div class="row d-flex justify-content-center py-5">

        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
                <!-- <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img" class="img-fluid rounded-start card-img-top" alt="..."> -->
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

    </div>


</template>


<style lang="scss" scoped>

</style>