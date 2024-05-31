<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

export default {
    name: 'Jumbrotron',

    data() {
        return {
            store,
            apiBaseUrl: 'http://127.0.0.1:8000/api',
            apiImageUrl: 'http://127.0.0.1:8000/storage/',

            homedishes: [],
            restaurantDishid: null,
        }


    },
    mounted() {

        this.restaurantDishid = this.$route.params.restaurant_id;

        axios.get(this.apiBaseUrl + '/dishes' + this.restaurantDishid).then(res => {
            console.log('questi sono i piatti:', res.data.results)

            this.homedishes = res.data.results


        });

    },
}
</script>
<template>

    <div class="container-fluid py-4 my-bg-img">
        <div class="container bg-opacity-75 pt-4" style=" background-color: rgba(0, 0, 0, 0.4);">

            <div class="jumbotron p-5 ">
                <h1 class="display-4 text-white">Benvenuti su <br> <span class="display-2">Wow Delive</span></h1>
                <p class="lead text-white">
                    Tu scegli il piatto,<br> al resto ci pensiamo <span class="fw-bolder ">Noi</span>.
                </p>


                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner ">
                        <div v-for="(homedish, index) in homedishes" :key="homedish.id"
                            :class="['carousel-item', { active: index === 0 }]">
                            <div class="card mb-3" style="max-width: 540px; margin: auto;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img :src="homedish.img.includes('https') ? homedish.img : this.apiImageUrl"
                                            class="my-img img-fluid rounded-start" :alt="homedish.name" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ homedish.name }}</h5>
                                            <p class="card-text">{{ homedish.description }}</p>
                                            <router-link
                                                :to="{ name: 'info-restaurant', params: { restaurant_id: this.$route.params.restaurant_id } }"
                                                class="btn btn-primary rounded-3 mb-5"></router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </div>
    </div>


</template>
<style lang="scss" scoped>
.my-bg-img {
    background-image: url('../public/images/jumbo-img.jpg');
    background-size: cover;
}

.my-img {
    height: 200px;
    object-fit: cover;
}
</style>