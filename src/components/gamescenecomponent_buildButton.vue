<template>
  <div>
     <canvas id="canvas" width="960" height="480"></canvas>
  </div>
</template>

<script>
  import Constant from './constant'
  export default {
    data () {
      return {
        gameWidth: 960,
        gameHeight: 480,
        cjs: null,
        canvas: null,
        stage: null,
        tileWidth: 86,
        tileHeight: 43,
        coins: 100,
        diamonds: 0,
        powerSupplies: 100,
        populations: 0,
        consIndicator: null,
        diamondsIndicator: null,
        populationIndicator: null,
        isCreatingNewBuilding: false
      }
    },

    mounted () {
      this.init()
      Constant.Event.$emit(Constant.MSG_CREATE_BUILDINGS, this.stage)
    },

    methods: {
      init () {
        this.cjs = window.createjs
        this.canvas = document.getElementById('canvas')
        this.stage = new this.cjs.Stage(this.canvas)
        var backGround = this.bgLayer()
        var uilayer = this.uiLayer()
        var citylayer = this.cityLayer()
        this.stage.addChild(backGround)
        this.stage.addChild(uilayer)
        this.stage.addChild(citylayer)
        this.stage.enableMouseOver()
        this.cjs.Ticker.setFPS(40)
        this.cjs.Ticker.addEventListener('tick', this.tick)
      },
      tick () {
        this.coinsIndicator.text = this.coins + ''
        this.diamondsIndicator.text = this.coins + ''
        this.populationIndicator.text = this.populations + ''
        this.powerSupplyIndicator.text = this.powerSupplies + ''
        this.stage.update()
      },
      layer () {
        var obj = new this.cjs.Container()
        return obj
      },
      cityLayer () {
        var obj = this.layer()
        var bg = new this.cjs.Bitmap('../../static/images/city-bg.png')
        bg.regX = 370
        bg.regY = 30
        obj.addChild(bg)
        // 9 * 9 grids
        obj.cols = obj.rows = 9
        var tiles = new this.cjs.Container()
        obj.addChild(tiles)

        obj.viewMap = this.create2DArray(obj.rows, obj.cols)
        obj.x = this.gameWidth / 2 - this.tileWidth / 2
        obj.y = this.gameHeight / 2 - (obj.rows - 1) * this.tileHeight / 2
        this.redraw(obj, tiles)
        return obj
      },
      redraw (layer, tiles) {
        for (var i = 0; i < layer.rows; i++) {
          for (var j = 0; j < layer.cols; j++) {
            var t = this.tile()
            t.x = (j - i) * this.tileWidth / 2
            t.y = (j + i) * this.tileHeight / 2
            tiles.addChild(t)
            layer.viewMap[i][j] = 0
          }
        }
      },
      bgLayer () {
        var layer = this.layer()
        var bitmap = new this.cjs.Bitmap('../../static/images/bg.png')
        layer.addChild(bitmap)

        var cloud1 = new this.cjs.Bitmap('../../static/images/cloud1.png')
        cloud1.y = 30
        cloud1.alpha = 0.4
        layer.addChild(cloud1)

        this.cjs.Tween.get(cloud1, {loop: true}).to({x: this.gameWidth + 300}, 0).wait(15500).to({x: -300}, 50 * 1000)

        var cloud2 = new this.cjs.Bitmap('../../static/images/cloud2.png')
        cloud2.y = 300
        cloud2.alpha = 0.4
        layer.addChild(cloud2)

        this.cjs.Tween.get(cloud2, {loop: true}).to({x: this.gameWidth + 50}, 0).wait(500).to({x: -300}, 50 * 1000)

        return layer
      },
      uiLayer () {
        var obj = this.layer()
        this.setupHUD(obj)
        return obj
      },
      placeBitmap (layer, path, x, y) {
        var bitmap = new this.cjs.Bitmap(path)
        bitmap.x = x
        bitmap.y = y
        layer.addChild(bitmap)
      },
      placeText (layer, textStr, size, x, y, align) {
        var text = new this.cjs.Text(textStr, size + 'px Arial', '#222')
        text.x = x
        text.y = y
        text.textAlign = align
        layer.addChild(text)
        return text
      },
      setupHUD (layer) {
        this.placeBitmap(layer, '../../static/images/candies.png', 28, 16)
        this.placeBitmap(layer, '../../static/images/diamonds.png', 154, 14)
        this.placeBitmap(layer, '../../static/images/populations.png', 810, 14)

        this.coinsIndicator = this.placeText(layer, '12345', 12, 123, 34, 'right')
        this.diamondsIndicator = this.placeText(layer, '0', 12, 250, 34, 'right')
        this.powerSupplyIndicator = this.placeText(layer, '100', 16, 905, 32, 'center')
        this.populationIndicator = this.placeText(layer, '100', 16, 845, 32, 'center')
      },
      create2DArray (rows, cols, initialValue) {
        var array = []
        for (var i = 0; i < rows; i++) {
          array[i] = []
          for (var j = 0; j < cols; j++) {
            array[i][j] = initialValue
          }
        }
        return array
      },
      tile () {
        var imagePath = '../../static/images/tile.png'
        var obj = new this.cjs.Bitmap(imagePath)
        obj.regX = 0
        obj.regY = 21
        obj.width = 86
        obj.height = 43
        return obj
      }
    }
  }
</script>

<style scoped>
</style>
