<template>
</template>

<script>
  import Vue from 'vue'
  export default {
    Event: new Vue(),
    MSG_CREATE_BUILDINGS: 'msg-create-buildings',
    MSG_NEWBUILDING_READY: 'msg-newbuidling-ready',
    MSG_PLACED_BUILDING: 'msg-placed-building',
    CoinsGenerator: {
      className: 'ConsGenerator',
      needCoins: 20,
      needPopulations: 10,
      power: 0,
      // change here
      stepsSeconds: [10, 20]
    },
    PowerSupply: {
      className: 'PowerSupply',
      needCoins: 10,
      needPopulations: 0,
      power: 15,
      // change here
      stepsSeconds: [5, 10]
    },
    Merchant: {
      className: 'Merchant',
      // change here for test
      needCoins: 15, // 150,
      needPopulations: 20,
      power: 0,
      // change here
      stepsSeconds: [20, 40]
    }
  }
</script>

<style>
</style>
