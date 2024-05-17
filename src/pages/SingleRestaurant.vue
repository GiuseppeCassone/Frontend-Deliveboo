<script>

import axios from 'axios';

export default {

    name: 'SingleRestaurant',

    data(){

        return {

            restaurant: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    mounted() {
        axios.get(this.apibaseUrl + '/restaurant').then(res => {
            
        })
    }

}


</script>


<template>

</template>


<style lang="scss" scoped>

</style>