<template>
  <div>
    <header>
      <div class="row">
        <h1 style="font-family: 'Wawati SC';color: #FFFFFF;font-size: 70px; margin-left: 27%">Color City</h1>
      </div>
    </header>
    <section id="game" class="row">
      <building-panel></building-panel>
      <game-scene></game-scene>
    </section>
  </div>
</template>

<script>
  import GameScene from './GameSceneComponent'
  import BuildingPanel from './BuidingPanelComponent'
  export default {
    components: {
      GameScene,
      BuildingPanel
    }
  }
</script>

<style scoped>
  #game {
    position: relative;
    width: 960px;
    height: 480px;
    /*border: 1px solid black;*/
  }

</style>
