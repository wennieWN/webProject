<template>
</template>

<script>
  import Constant from './constant'
  export default {
    data () {
      return {
        show: false,
        cjs: null,
        helper: null,
        buildings: [],
        buildingPanel: null,
        cancelBuildBtn: null,
        gameSceneComponent: null,
        // change here
        buttonsMap: {}
      }
    },

    mounted () {
      this.cjs = window.createjs
      this.init()
      Constant.Event.$on(Constant.MSG_CREATE_BUILDINGS, function (component) {
        this.gameSceneComponent = component
        this.setupBuildingPanel()
        component.stage.addChild(this.buildingPanel)
        this.createCancelBuildButton(component.stage)
      }.bind(this))
      Constant.Event.$on(Constant.MSG_PLACED_BUILDING, function () {
        this.cancelBuildBtn.visible = false
        this.newBuildingBtn.visible = true
      }.bind(this))
    },

    methods: {
      init () {
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
      },
      setupBuildingPanel () {
        this.buildingPanel = new this.cjs.Container()
        this.buildingPanel.visible = false
        for (var i = 0; i < 3; i++) {
          this.setupBuildingButton(i)
        }

        // change here
        this.decideWhetherButtonDisableOrNot()
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
        // change here
        var buttons = {}
        var _this = this
        // change here
        buttons['enableButton'] = button
        button.on('click', function () {
          // 从这里开始触发整个建筑物拖拽效果
          console.log('building selected:' + b.name)
          // 记录要建筑的建筑物名字
          _this.gameSceneComponent.buildingTypeToBePlaced = b.name
          _this.gameSceneComponent.isCreatingNewBuilding = true
          _this.buildingPanel.visible = false
          _this.cancelBuildBtn.visible = true
          Constant.Event.$emit(Constant.MSG_NEWBUILDING_READY)
        })

        var buttonDisabled = new this.cjs.Bitmap('../../static/images/build-' + b.image + '-disabled.png')
        buttonDisabled.x = button.x
        buttonDisabled.y = button.y
        buttonDisabled.visible = false
        this.buildingPanel.addChild(buttonDisabled)

        // change here
        buttons['disableButton'] = buttonDisabled
        this.buttonsMap[b.name] = buttons
      },

      // change here
      decideWhetherButtonDisableOrNot () {
        // 判断当前是否有足够的钱币,电量和人口去建造建筑物
        for (var i = 0; i < 3; i++) {
          var b = this.buildings[i]
          var hasEnoughPowerSupplies = Constant[b.name].needPopulations === 0 || (this.gameSceneComponent.powerSupplies - this.gameSceneComponent.populations >= Constant[b.name].needPopulations)

          var hasEnoughCoins = (this.gameSceneComponent.coins >= Constant[b.name].needCoins)
          var button = this.buttonsMap[b.name].enableButton
          var buttonDisabled = this.buttonsMap[b.name].disableButton

          if (hasEnoughPowerSupplies && hasEnoughCoins) {
            button.visible = true
            buttonDisabled.visible = false
          } else {
            button.visible = false
            buttonDisabled.visible = true
          }
        }
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
          // change here
          _this.decideWhetherButtonDisableOrNot()
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
