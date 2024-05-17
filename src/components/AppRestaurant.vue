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
        }
    }
}


</script>



<template>

    <div class="card" style="width: 18rem;">
        <img :src="restaurant.img.includes('https') ? restaurant.img : this.apiImageUrl + restaurant.img" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.description }}</p>
            <p v-for="typology in restaurant.typologies" class="card-text">{{ typology.type }}</p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
    </div>



</template>



<style scoped lang="scss">

</style>