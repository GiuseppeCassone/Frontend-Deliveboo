<script>

import axios from 'axios';

import AppRestaurant from '../components/AppRestaurant.vue';

export default{

    name: 'HomePage',

    components: {
        AppRestaurant,
    },

    data() {
        return {
            
            restaurants: [],

            apiPageNumber: 1,



            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',

        }
    },

    mounted(){

        this.apiCall();

    },

    methods: {
        apiCall(){

            axios.get(this.apiBaseUrl + '/restaurant', {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {
                // console.log(res.data.results)

                this.restaurants = res.data.results

                console.log(this.restaurants)
            })


        }
    }



}

</script>



<template>
    <div class="container">
        
        
        <div class="d-flex justify-content-between flex-wrap gap-2">

           <AppRestaurant v-for="restaurant in restaurants" :restaurant="restaurant"
           ></AppRestaurant>

        </div>


    </div>
</template>




<style scoped>

</style>