<script>

import axios from 'axios';

export default {
    name: 'AppRestaurant',

    props: {
        restaurant : Object,
    },

    data(){
        return{

            apiImageUrl: 'http://127.0.0.1:8000/storage/',

            apiBaseUrl: 'http://127.0.0.1:8000/api',
        }
    }
}


</script>



<template>

    <div class="col card px-0 f-flex flex-column justify-content-between " style="width: 18rem;">
        <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.description }}</p>
            <p v-for="typology in restaurant.typologies" class="card-text">{{ typology.type }}</p>
            <router-link :to="{name: 'InfoRestaurant', params: { id: restaurant.id }}" class="btn btn-info">Vai al ristorante</router-link>
        </div>
    </div>



</template>



<style scoped lang="scss">

</style>