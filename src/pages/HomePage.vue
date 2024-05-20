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
            
            // array contenente la lista di tutti iristoranti 
            // risultante dalla chiamata API
            restaurants: [],

            // array contenente la lista di tutte le tipologie dei  
            // ristoranti risultante dalla chiamata API
            typologies: [],

            // array che contiene le tipologie di ristorante
            // scelte dall'utente
            checkBoxValue: [],

            // variabile che tiene traccia della paginazione
            apiPageNumber: 1,

            // link ai vari endpoint dell'api per vedere le varie pagine dei post
            apiLinks: [],

            // link base per la chiamata api
            apiBaseUrl: 'http://127.0.0.1:8000/api',

            // link base per la chiamata api per le immagini
            apiImageUrl: 'http://127.0.0.1:8000/storage/',

        }
    },

    mounted() {
        // richiamo api che mostra tutti i ristoranti
        this.apiCall();

        // richiamo api che mostra tutte le tipologie
        axios.get(this.apiBaseUrl + '/typologies').then(res => {
                // console.log(res.data.results);

                this.typologies = res.data.results;

                // console.log(this.typologies);
            });

    },

    created() {
        // chiamata axios per i link della paginazione
        axios.get(this.apiBaseUrl + '/restaurant', {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {

                this.apiLinks = res.data.results.links;
                // console.log(this.apiLinks)

            })
    },

    methods: {
        apiCall(){

            axios.get(this.apiBaseUrl + '/restaurant', {
                params: {
                    page: this.apiPageNumber
                }
            }).then(res => {
                // console.log(res.data.results.links)

                this.restaurants = res.data.results.data

            })

            // axios.get(this.apiBaseUrl + '/typologies').then(res => {
            //     // console.log(res.data.results);

            //     this.typologies = res.data.results;

            //     // console.log(this.typologies);
            // });

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
    
                    this.restaurants = res.data.results.data
    
                    // console.log(this.checkBoxValue)
                })

            } else {
                this.apiCall();
            }
        },

        // metodo che gestisce la paginazione
        changeApiPage(pageNumber) {
            // console.log(pageNumber);
            if(pageNumber == '&laquo; Previous') {

                this.apiPageNumber = Number(this.apiPageNumber) - 1;

            } else if(pageNumber == 'Next &raquo;'){

                this.apiPageNumber = Number(this.apiPageNumber) + 1;

            } else {
                
                this.apiPageNumber = pageNumber;

            }

            this.apiCall();
        },

        // check() {
        //     console.log('checked');

        //     return this.checkBoxValue ? true : false;
        // }
    },



}

</script>



<template>
    <div class="container mb-5">
        
        <!-- sezione lista delle tipologie -->
        <div class="restaurant-typologies d-flex gap-3 mb-3">

            <div v-for="typology in typologies" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" :value="typology.type" :id="typology.type" :name="typology.type" v-model="checkBoxValue" @change="apiFilterByTypes()"> <!-- v-model="checkBoxValue" -->
                <label class="form-check-label" :for="typology.type">{{typology.type}}</label>
            </div>

        </div>
        
        <!-- sezione lista dei ristoranti -->
        <div class="restaurants-list d-flex flex-column justify-content-between">

            <AppRestaurant 
                v-for="restaurant in restaurants" :restaurant="restaurant"
            >
            </AppRestaurant>

        </div>

        <!-- sezione per la paginazione -->
        <div class="pages">
                <div class="previous" 
                    :class="apiPageNumber == 1 ? 'none' : ''"
                    @click="changeApiPage(apiLinks[0].label)"
                    >
                    <i class="fa-solid fa-arrow-left"
                    :class="apiPageNumber == 1 ? 'none' : ''"></i>
                </div>
 
                <div class="next" 
                    :class="apiPageNumber == apiLinks.length - 2 ? 'none' : ''"
                    @click="changeApiPage(apiLinks[apiLinks.length - 1].label)"
                    >
                    <i class="fa-solid fa-arrow-right"
                    :class="apiPageNumber == apiLinks.length - 2 ? 'none' : ''"></i>
                </div>
            </div>


    </div>
</template>




<style scoped lang="scss">
@use '../styles/variables' as *;

.restaurants-list{
    gap: 60px;

    margin-bottom: 50px;
}

.pages {
    display: flex;
    justify-content: center;
    gap: 10px;

    color: white;

    .previous, .next {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 30px;
        height: 30px;
        background-color: #006769;

        padding: 8px;

        border-radius: 10px;

        transition: all .3s ease;

        cursor: pointer;

        &:hover, &.active{
            background-color: #9DDE8B;
        }

        &.none {
            display: none;
        }
    }
}

.restaurant-typologies{
    overflow-x: auto;
}
</style>