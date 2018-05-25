<template>
</template>

<script>
  import Constant from './constant'
  export default {
    data () {
      return {
        show: false,
        buildingData: {},
        cjs: null,
        helper: null,
        buildings: [],
        buildingPanel: null,
        cancelBuildBtn: null
      }
    },

    mounted () {
      this.cjs = window.createjs
      this.init()
      Constant.Event.$on(Constant.MSG_CREATE_BUILDINGS, function (stage) {
        this.buildingPanel.visible = true
        stage.addChild(this.buildingPanel)
      }.bind(this))
    },

    methods: {
      init () {
        this.buildingData['CoinsGenerator'] = {
          className: 'ConsGenerator',
          needCoins: 20,
          needPopulations: 10,
          power: 0
        }
        this.buildingData['PowerSupply'] = {
          className: 'PowerSupply',
          needCoins: 10,
          needPopulations: 0,
          power: 15
        }
        this.buildingData['Merchant'] = {
          className: 'Merchant',
          needCoins: 150,
          needPopulations: 20,
          power: 0
        }
        this.buildings[0] = {
          name: 'PowerSupply',
          image: 'power-supply',
          x: 20
        }
        this.buildings[1] = {
          name: 'CoinsGenerator',
          image: 'coins-generator',
          x: 338
        }
        this.buildings[2] = {
          name: 'Merchant',
          image: 'merchant',
          x: 650
        }
        this.setupBuildingPanel()
      },
      setupBuildingPanel () {
        this.buildingPanel = new this.cjs.Container()
        this.buildingPanel.visible = false
        for (var i = 0; i < 3; i++) {
          this.setupBuildingButton(i)
        }
      },
      createButton (spriteImage, width, height) {
        var data = {
          images: [spriteImage],
          frames: {width: width, height: height}
        }
        var spritesheet = new this.cjs.SpriteSheet(data)
        var button = new this.cjs.Sprite(spritesheet, 1)
        this.helper = new this.cjs.ButtonHelper(button, 0, 1, 2)
        return button
      },
      setupBuildingButton (i) {
        var b = this.buildings[i]
        var button = this.createButton('../../static/images/build-' + b.image + '-sprite.png', 286, 396)
        button.x = b.x
        button.y = 16
        this.buildingPanel.addChild(button)

        var _this = this
        button.on('click', function () {
          _this.buildingTypeToBePlaced = b.name
          _this.readyToPalceBuilding()
        })

        var buttonDisabled = new this.cjs.Bitmap('../../static/images/build-' + b.image + '-disabled.png')
        buttonDisabled.x = button.x
        buttonDisabled.y = button.y
        buttonDisabled.visible = false
        this.buildingPanel.addChild(buttonDisabled)
      },
      createCancelBuildButton (stage) {
        this.cancelBuildBtn = this.createButton('../../static/images/cancel-sprite.png', 128, 62)
        this.cancelBuildBtn.x = 820
        this.cancelBuildBtn.y = 400
        this.cancelBuildBtn.visible = false
        var _this = this
        this.cancelBuildBtn.on('click', function () {
          _this.cancelBuildBtn.visible = false
          _this.buildingPanel.visible = false
          _this.newBuildingBtn.visible = true
        })
        stage.addChild(this.cancelBuildBtn)

        this.newBuildingBtn = this.createButton('../../static/images/add-building-sprite.png', 124, 42)
        this.newBuildingBtn.x = 820
        this.newBuildingBtn.y = 420
        this.newBuildingBtn.on('click', function () {
          _this.buildingPanel.visible = true
          _this.cancelBuildBtn.visible = true
          _this.newBuildingBtn.visible = false
        })
        stage.addChild(this.newBuildingBtn)
      }
    }
  }
</script>

<style scoped>
</style>
