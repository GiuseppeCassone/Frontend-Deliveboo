<script>
import { store } from '../store';
import { router } from '../router';


export default {
    name: 'WithUs',


    data() {
        return {
            store,

        }


    },


}
</script>
<template>


    <div id="my-circle-carousel" class="container-fluid circle-bg p-3 ">
        <div class="row justify-content-center ">
            <div class="col-10 ">

                <div id="carouselIndicators" class="carousel slide d-flex flex-column align-items-center rounded-3" style=" background-color: rgba(0, 0, 0, 0.4); height: 350px  ;">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"
                            aria-current="true" aria-label="Slide 1" id="my-cirlce-button"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2" id="my-circle-button"></button>

                    </div>
                    <div class="carousel-inner ">
                        <div class="carousel-item active  my-circle-padding">
                            <div class="d-flex flex-column align-items-center ">
                                <!-- <img src="../../public/images/woman_testimonial.png" class="d-block w-20 p-4" alt="..."> -->
                                <h3 class=" text-white py-3">Il Nostro obbiettivo è quello di fornire un servizio accessibile ed efficente per i Nostri Clienti.</h3>
                                <p class=" text-white">Alberto,Simone,Roberto,Giuseppe ed Alex</p>

                            </div>
                        </div>
                        <div class="carousel-item ">
                            <div class="d-flex flex-column align-items-center my-circle-padding">
                                
                                <h3 class=" text-white py-3">Siamo pronti a partire con una nuova esperienza<br> Ti aspettiamo</h3>
                                <a href="http://127.0.0.1:8000/register" target="_blank" class="btn btn-light btn-lg rounded-2 px-4">Collabora con Noi</a>

                            </div>
                        </div>
                    </div>
                    <div class="blurred-background"></div>
                </div>
            </div>

        </div>
    </div>




</template>
<style lang="scss" scoped>
@use '../styles/variables' as *;

.circle-bg {
    background-image: url(/images/work-with-us-2.jpg);
    background-size: cover;
    background-position: bottom;
    background-position: bottom;
  
    position: relative;
    



}
.blurred-background {
  /* Match dimensions of .circle-bg */
  width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(/images/work-with-us-2.jpg);
    background-size: cover;
    background-position: bottom;
    filter: blur(5px);
    z-index: -1;
}


#my-circle-carousel .carousel-indicators button {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    /* Add background color for visibility */
    border: 1px solid #ccc;
    /* Add a border for better contrast */
}

.my-circle-padding {
    padding: 80px 60px;
    /* Reduce padding to avoid hiding buttons */
}
</style>
