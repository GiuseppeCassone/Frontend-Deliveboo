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
    <div class="col card px-0 d-flex flex-column justify-content-between" style="width: 18rem;">
      <img 
        :src="getImageUrl(restaurant.img)" 
        class="card-img-top" 
        :alt="restaurant.name" />
      <div class="card-body" style="background-color: #f8f9fa;">
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
    </div>
  </template>
  

  
  <style scoped lang="scss">
  .card {
    margin-bottom: 1.5rem;
  }
  
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .badge {
    font-size: 0.85rem;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  }
  </style>
  