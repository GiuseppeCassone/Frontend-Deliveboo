<script>
import axios from 'axios';

export default {
  name: 'AppRestaurant',

  props: {
    restaurant: Object,
  },

  data() {
    return {
      apiImageUrl: 'http://127.0.0.1:8000/storage/',
    };
  },

  methods: {
    getImageUrl(imageUrl) {
      return imageUrl.includes('https') ? imageUrl : this.apiImageUrl + imageUrl;
    },
  },
};
</script>

<template>
    <!-- <div class="col card d-flex flex-column justify-content-between">
      <img 
        :src="getImageUrl(restaurant.img)" 
        class="card-img-top" 
        :alt="restaurant.name" />
      <div class="card-body">
        <h5 class="card-title text-success">{{ restaurant.name }}</h5>
        <p class="card-text text-dark">{{ restaurant.description }}</p>
        <div v-if="restaurant.typologies.length">
          <span 
            v-for="(typology, index) in restaurant.typologies" 
            :key="index" 
            class="badge bg-warning text-dark me-1">
            {{ typology.type }}
          </span>
        </div>
        <router-link 
          :to="{ name: 'InfoRestaurant', params: { id: restaurant.id } }" 
          class="btn btn-success mt-3">
          Vai al ristorante
        </router-link>
      </div>
    </div> -->

    <div class="restaurant">
        <img :src="getImageUrl(restaurant.img)" alt="">

        <div class="restauran-info">

            <div class="info-top">
                <div class="left">
                    <div class="restaurant-name">
                        {{ restaurant.name }}
                    </div>
                    <div class="restaurant-address">
                        {{ restaurant.address }}
                    </div>
                    <div class="restaurant-phone">
                        <i class="fa-solid fa-phone"></i>
                        {{ restaurant.phone_number }}
                    </div>
                    <div class="d-flex gap-1 mt-1" v-if="restaurant.typologies.length">
                        <span 
                            v-for="(typology, index) in restaurant.typologies" 
                            :key="index" 
                            class="badge bg-warning text-dark">
                            {{ typology.type }}
                        </span>
                    </div>
                </div>
                <div class="right">
                    <div class="restaurant-link">
                        <router-link 
                            :to="{ name: 'InfoRestaurant', params: { id: restaurant.id } }">
                            <i class="fa-solid fa-utensils"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="info-bot">

            </div>
        </div>  
    </div>

  </template>
  

  
<style scoped lang="scss">
.restaurant{
    position: relative;

    height: 150px;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;

        border-radius: 10px;
    }

    .restauran-info{
        width: 80%;
        height: 100px;
        background-color: white;
        /* test */

        padding: 5px;

        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);

        border-radius: 10px;

        box-shadow: 5px 5px 5px;

        .info-top{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .restaurant-name{
                font-weight: bold;
            }

            .restaurant-address, .restaurant-phone{
                font-size: .8em;

                color: rgba(0, 0, 0, .5);
            }

            .restaurant-link{
                display: flex;
                justify-content: center;
                align-items: center;

                width: 30px;
                height: 30px;
                background-color: #E4706F;

                border-radius: 50%;

                .fa-utensils{
                    color: white;
                }
            }
        }
    }
}
/* .card {
    margin-bottom: 1.5rem;
    width: 18rem;
  }
  
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  
  .card-body {
    padding: 1rem;
    background-color: #f8f9fa;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .card-text {
    margin-bottom: 0.5rem;
  }
  
  .badge {
    font-size: 0.85rem;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  } */
</style>
  