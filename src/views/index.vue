<template>
  <div id="app">
    <div v-on:click="toNext" >
      <lottie :options="defaultOptions"  v-on:animCreated="handleAnimation" style="height: 100%;width: 100%"/>
    </div>
  </div>
</template>

<script>
  import Lottie from '../../node_modules/vue-lottie/src/lottie.vue';
  import * as animationData from '../js/testData2.json';
  export default {
    name: 'index',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData: animationData},
        animationSpeed: 1
      }
    },
    methods: {
      toNext:function () {
        this.$router.push({name:'color'})
      },

      handleAnimation: function (anim) {
        this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }
    }
  }
</script>
