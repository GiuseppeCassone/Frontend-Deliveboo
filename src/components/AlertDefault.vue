<script>

export default {

    name: 'AlertDefault',

    props: {
        visible: Boolean,
        variant: String,
    },

    data() {
        return {
            openClose: this.visible,
        }
    },

    methods: {
        OpenCloseFun() {
            this.openClose = !this.openClose;
        }
    },

    watch:{
        visible: function(newVal, oldVal) {
            this.openClose = newVal;
            console.log('new ' + newVal + '==' + oldVal);
        }
    }

}

</script>

<template>

<div v-if="openClose" class="modal fade show"
tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog"
    style="display:block"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" @click="OpenCloseFun()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="OpenCloseFun()" type="button" class="btn btn-secondary">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
<button type="button"
        @click="OpenCloseFun()" :class="'btn btn-' +variant ">Open Modal
</button>
</template>

<style>

</style>