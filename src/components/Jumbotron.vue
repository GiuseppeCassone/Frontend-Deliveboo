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
            // restaurantDishid: null,
        }


    },
    mounted() {

        // this.restaurantDishid = this.$route.params.restaurant_id;

        axios.get(`${this.apiBaseUrl}/dishes?restaurant_id=${this.restaurantDishid}`).then(res => {
            console.log('questi sono i piatti:', res.data.results)

            this.homedishes = res.data.results


        });

    },
}
</script>
<template>

    <div class="container-fluid w-100 py-4 my-bg-img">
        <div class="container bg-opacity-75 pt-4 rounded-3" style=" background-color: rgba(0, 0, 0, 0.4);">

            <div class="jumbotron p-5 d-flex flex-column">
                <div class="row d-flex justify-content-between between mb-3">
                    <h1 class="col-12 col-lg-8 display-4 text-white">Benvenuti su <br> <span class="display-2 fw-bolder">WOW DELIVE</span></h1>
                    <div class="col-12 col-lg-4 lead text-white d-flex align-items-center">
                       <p class="mb-0">Tu scegli il piatto,<br> al resto ci pensiamo <strong>Noi</strong>.</p>
                    </div>
                </div>

                <div id="carouselExampleCaptions" class="carousel slide align-self-center" >
                    <div class="carousel-inner">
                        <routerLink :to="{ name: 'info-restaurant', params: { id: homedish.restaurant_id } }" 
                        v-for="(homedish, index) in homedishes" :key="homedish.id"
                        :class="['carousel-item', { active: index === 0 }]">
                            <div class="container d-flex justify-content-center div-img">
                                <img :src="homedish.img.includes('https') ? homedish.img : this.apiImageUrl"
                                class="my-img img-fluid" :alt="homedish.name" />
                            </div>
                            <div class="carousel-caption d-block">
                                <h5 class="card-title text-center ">{{ homedish.name }}</h5>
                            </div>
                        </routerLink>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </div>
    </div>


</template>
<style lang="scss" scoped>
@use '../styles/variables' as *;

.my-bg-img {
    background-image: url('../images/jumbo-img.jpg');
    background-size: cover;
}

.my-img {
    height: 200px;
    object-fit: cover;
}


.btn-color{

  background-color: $secondColor;
  border-color: $primaryColor;

  &:hover{
  background-color: $primaryColor;
  }

}

@media screen and (min-width: 700px) and (max-width: 1300px){

    #carouselExampleCaptions{

        min-width: 600px;

    }

    .div-img{
        width: 300px;
    }

}


@media screen and (min-width: 420px) and (max-width: 600px){

    #carouselExampleCaptions{

        max-width: 350px !important;

    }

    .div-img{
        width: 300px;
    }

}


</style>