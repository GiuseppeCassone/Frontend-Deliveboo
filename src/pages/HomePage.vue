<script>

import axios from 'axios';

export default{

    name: 'HomePage',

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
        
        
        <ul class="d-flex justify-content-between flex-wrap gap-2">

            <li class="list-unstyled " v-for="restaurant in restaurants">

                <div class="card" style="width: 18rem;">
                    <img :src="restaurant.img ? this.apiImageUrl + restaurant.img : restaurant.img " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.name }}</h5>
                        <p class="card-text">{{ restaurant.description }}</p>
                        <p v-for="typology in restaurant.typologies" class="card-text">{{ typology.type }}</p>
                        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    </div>
                </div>

            </li>


        </ul>


    </div>
</template>




<style scoped>

</style>