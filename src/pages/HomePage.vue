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

            typologies: [],

            checkBoxValue: [],

            apiPageNumber: 1,



            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',

        }
    },

    mounted(){
        // richiamo api che mostra tutti i ristoranti
        this.apiCall();

        // richiamo api che mostra tutte le tipologie
        axios.get(this.apiBaseUrl + '/typologies').then(res => {
                // console.log(res.data.results);

                this.typologies = res.data.results;

                // console.log(this.typologies);
            });

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

                // console.log(this.restaurants)
            })

        },


        // funzione che filtra i ristoranti in base alle tipologie scelte nella checkbox
        apiFilterByTypes(){
            if(this.checkBoxValue.length > 0) {
                axios.get(this.apiBaseUrl + '/restaurant?typologies=' + this.checkBoxValue, {
                    params: {
                        page: this.apiPageNumber
                    }
                }).then(res => {
                    // console.log(res.data.results)
    
                    this.restaurants = res.data.results
    
                    console.log(this.checkBoxValue)
                })

            } else {
                this.apiCall();
            }
        },

    },



}

</script>



<template>
    <div class="container">
        
        <div class="restaurant-typologies d-flex gap-3 flex-wrap">

            <div v-for="typology in typologies" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" :value="typology.type" :id="typology.type" :name="typology.type" v-model="checkBoxValue" @change="apiFilterByTypes()"> <!-- v-model="checkBoxValue" -->
                <label class="form-check-label" :for="typology.type">{{typology.type}}</label>
            </div>

        </div>
        
        <div class="d-flex justify-content-between flex-wrap gap-2">

           <AppRestaurant v-for="restaurant in restaurants" :restaurant="restaurant"
           ></AppRestaurant>

        </div>


    </div>
</template>




<style scoped>

</style>