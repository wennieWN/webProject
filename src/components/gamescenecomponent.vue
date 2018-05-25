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
        isCreatingNewBuilding: false,
        // 记录当前被已经被拖放的建筑物信息
        buildingList: [],
        // 当前正在跟着鼠标半透明显示的建筑物
        ghostBuilding: null,
        // change here
        // 经过800时间单位能创造一个钻石
        // change here for test
        tickCountForMerchantDiamond: 100,
        // 200金币换一个钻石
        // change for test
        coinsNeededForDiamond: 20, // 200,
        // 每隔90个时间单位增加一个金币
        coinGenerationCountDown: 90,
        // 当前总共增加几个金币
        coinGenerationCount: 0
      }
    },

    mounted () {
      this.init()
      Constant.Event.$emit(Constant.MSG_CREATE_BUILDINGS, this)

      Constant.Event.$on(Constant.MSG_NEWBUILDING_READY, function () {
        this.newBuildingToBePlaced()
      }.bind(this))
    },

    methods: {
      init () {
        this.cjs = window.createjs
        this.canvas = document.getElementById('canvas')
        this.stage = new this.cjs.Stage(this.canvas)
        // change here
        if (localStorage['city.buildinglist']) {
          this.buildingList = JSON.parse(localStorage['city.buildinglist'])
        } else {
          this.buildingList = []
        }
        // *1 将字符强行转换成数字
        this.coins = localStorage['city.coins'] * 1 || 10
        this.diamonds = localStorage['city.diamonds'] * 1 || 0
        var backGround = this.bgLayer()
        var uilayer = this.uiLayer()
        this.cityLayer = this.cityLayer()
        this.stage.on('stagemousemove', this.handleStageMouseMove)
        this.stage.on('click', this.handleCityLayerClick)
        this.stage.addChild(backGround)
        this.stage.addChild(uilayer)
        this.stage.addChild(this.cityLayer)
        this.stage.enableMouseOver()
        this.cjs.Ticker.setFPS(40)
        this.cjs.Ticker.addEventListener('tick', this.tick)
      },
      tick () {
        this.coinsIndicator.text = this.coins + ''
        this.diamondsIndicator.text = this.diamonds + ''
        this.populationIndicator.text = this.populations + ''
        this.powerSupplyIndicator.text = this.powerSupplies + ''
        this.cityGrowingTick()
        this.redraw(this.cityLayer, this.cityLayer.tiles)
        this.coinsTick()
        this.stage.update()

        // change here
        this.autoSave()
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
        obj.tiles = tiles
        obj.addChild(tiles)

        obj.viewMap = this.create2DArray(obj.rows, obj.cols, 'Tile')
        // change here
        // 用数组记录当前放下的建筑物类型
        obj.data = this.create2DArray(obj.rows, obj.cols, 'init')
        obj.x = this.gameWidth / 2 - this.tileWidth / 2
        obj.y = this.gameHeight / 2 - (obj.rows - 1) * this.tileHeight / 2
        this.redraw(obj, tiles)
        return obj
      },
      redraw (layer, tiles) {
        // 先创建一个二维数组,然后从建筑物记录数组中找到当前已经放置到方格里的建筑物,根据建筑物所在的方格坐标填充到数组中
        var newDataMap = this.create2DArray(layer.rows, layer.cols, 'Tile')
        for (var i = 0, len = this.buildingList.length; i < len; i++) {
          var b = this.buildingList[i]
          var className = b.name
          // change here
          if (!b.isConstructionDone) {
            className = 'construction-step' + b.currentStep
          }
          newDataMap[b.y][b.x] = className
        }

        for (i = 0; i < layer.rows; i++) {
          for (var j = 0; j < layer.cols; j++) {
            if (layer.data[i][j] !== newDataMap[i][j]) {
              tiles.removeChild(layer.viewMap[i][j])
              var t = this.tile()
              var obj = this.getBuildingByName(newDataMap[i][j])
              if (obj != null) {
                t = obj
              }
              t.x = (j - i) * (this.tileWidth / 2)
              t.y = (j + i) * (this.tileHeight / 2)
              tiles.addChild(t)
              layer.viewMap[i][j] = t
            }
          }
        }

        layer.data = newDataMap
        // change here
        tiles.sortChildren(function (b1, b2) {
          if (b1.y > b2.y) { return 1 }
          if (b1.y < b2.y) { return -1 }
          return 0
        })
      },
      bgLayer () {
        var layer = this.layer()

          //todo:modify
//        var bitmap = new this.cjs.Bitmap('../../static/images/bg.png')
//        layer.addChild(bitmap)

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
      tile (path) {
        var imagePath = path || '../../static/images/tile.png'
        var obj = new this.cjs.Bitmap(imagePath)
        obj.regX = 0
        obj.regY = 21
        obj.width = 86
        obj.height = 43
        return obj
      },
      // 将屏幕鼠标坐标转换成建筑物拖放位置
      screenToIsoCoord (screenX, screenY) {
        var ix = Math.floor((screenY * this.tileWidth + screenX * this.tileHeight) / (this.tileWidth * this.tileHeight))
        var iy = Math.floor((screenY * this.tileWidth - screenX * this.tileHeight) / (this.tileWidth * this.tileHeight)) + 1
        return {x: ix, y: iy}
      },
      isoToScreenCoord (isoX, isoY) {
        var sx = (isoX - isoY) * this.tileWidth / 2
        var sy = (isoX + isoY) * this.tileHeight / 2
        return new this.cjs.Point(sx, sy)
      },
      coinsGenerator () {
        var obj = this.tile('../../static/images/coins-generator.png')
        obj.width = 86
        obj.height = 43
        obj.regX = 0
        obj.regY = 94
        return obj
      },
      merchant () {
        var obj = this.tile('../../static/images/merchant.png')
        obj.width = 86
        obj.height = 43
        obj.regX = 0
        obj.regY = 43
        return obj
      },
      powerSupply () {
        var obj = this.tile('../../static/images/power-supply.png')
        obj.width = 86
        obj.height = 43
        obj.regX = 0
        obj.regY = 51
        return obj
      },
      // change here
      constructionStep1 () {
        var obj = this.tile('../../static/images/construction-step1.png')
        obj.width = 86
        obj.height = 43
        obj.regX = 0
        obj.regY = 51
        obj.name = 'construction-step1'
        return obj
      },
      constructionStep2 () {
        var obj = this.tile('../../static/images/construction-step2.png')
        obj.width = 86
        obj.height = 43
        obj.regX = 0
        obj.regY = 74
        obj.name = 'construction-step2'
        return obj
      },
      building (isoX, isoY, viewClassName) {
        var buildings = {}
        buildings.x = isoX
        buildings.y = isoY
        buildings.name = viewClassName

        buildings.isConstructionDone = false
        buildings.currentStep = 1
        console.log('have building')
        console.log(Constant[viewClassName].stepsSeconds)
        buildings.stepsSecond = Constant[viewClassName].stepsSeconds
        buildings.buildTime = (new Date()).getTime()
        return buildings
      },
      cityGrowingTick () {
        // 遍历建筑列表如果建筑物正在建造过程，那么根据过去时长改变建筑物的形态
  
        for (var i = 0, len = this.buildingList.length; i < len; i++) {
          var building = this.buildingList[i]
          if (building.isConstructionDone === true) {
           // 建筑物处于建造完成阶段
            continue
          }
          var secondDiff = Math.floor(((new Date()).getTime() - building.buildTime) / 1000)

          for (var j = 0, length = building.stepsSecond.length; j < length; j++) {
            if (secondDiff >= building.stepsSecond[j]) {
              // cafule here
              building.currentStep = j + 2
              if (building.currentStep > length) {
                console.log('construction done')
                building.isConstructionDone = true
              }
            }
          }
        }
      },
      newBuildingToBePlaced () {
        this.cityLayer.removeChild(this.ghostBuilding)
        this.ghostBuilding = this.getBuildingByName(this.buildingTypeToBePlaced)
        this.ghostBuilding.alpha = 0.5
        this.ghostBuilding.visible = false
        this.cityLayer.addChild(this.ghostBuilding)
      },
      getBuildingByName (name) {
        if (name === 'PowerSupply') {
          console.log('PowerSupply')
          return this.powerSupply()
        }
        if (name === 'Merchant') {
          console.log('Merchant')
          return this.merchant()
        }
        if (name === 'CoinsGenerator') {
          console.log('CoinsGenerator')
          return this.coinsGenerator()
        }

        // change here
        if (name === 'construction-step1') {
          return this.constructionStep1()
        }

        if (name === 'construction-step2') {
          return this.constructionStep2()
        }

        return null
      },
      showGhostBuilding (x, y) {
        this.ghostBuilding.visible = true
        // 先把相对于整个画面的坐标坐标转换为相对于城市图层的坐标
        var localPt = this.cityLayer.globalToLocal(x, y)
        // 根据坐标所在的位置计算鼠标所指向的方格在第几行第几列
        var isoCoord = this.screenToIsoCoord(localPt.x, localPt.y)
        // 根据上面得到的方格，计算其中心位置所在城市图层中的具体坐标
        var tileScreenCoord = this.isoToScreenCoord(isoCoord.x, isoCoord.y)
        // 把半透明的建筑物图片显示在鼠标所在的方块内
        this.ghostBuilding.x = tileScreenCoord.x
        this.ghostBuilding.y = tileScreenCoord.y
        this.ghostBuilding.filters = []

        // 如果方块内已经被其他建筑物占据，那么让跟随着鼠标的图片显示出红色
        var isTileAvailable = (this.cityLayer.data[isoCoord.y] && this.cityLayer.data[isoCoord.y][isoCoord.x] === 'Tile')
        if (!isTileAvailable) {
          this.ghostBuilding.filters = [new this.cjs.ColorFilter(1, 0, 1, 1)]
        }
        this.ghostBuilding.cache(0, 0, 100, 100)
      },
      handleStageMouseMove (e) {
        if (!this.isCreatingNewBuilding) {
          if (this.ghostBuilding != null) {
            this.ghostBuilding.visible = false
          }
          return
        }

        this.showGhostBuilding(e.stageX, e.stageY)
      },
      handleCityLayerClick (e) {
        if (this.ghostBuilding !== null && this.ghostBuilding.visible !== true) {
          return
        }
        // 将鼠标相对于舞台容器的坐标转换为城市图层对应的坐标
        var localPt = this.cityLayer.globalToLocal(e.stageX, e.stageY)
        // 获得鼠标指向的方块在第几行第几列
        var isoCoord = this.screenToIsoCoord(localPt.x, localPt.y)
        // 判断当前方块是否可以放置建造物
        var isTileAvailable = (this.cityLayer.data[isoCoord.y])
        isTileAvailable = (this.cityLayer.data[isoCoord.y][isoCoord.x] === 'Tile')
        if (this.isCreatingNewBuilding && isTileAvailable) {
          console.log('put buidling')
          // 获取建筑物所需钱币数
          var needCoins = Constant[this.buildingTypeToBePlaced].needCoins
          console.log('needCoins', needCoins)
          this.coins -= needCoins
          // 通知buildingPanel,建筑物成功建造
          Constant.Event.$emit(Constant.MSG_PLACED_BUILDING)
          console.log('after send msg')
          this.isCreatingNewBuilding = false
          this.ghostBuilding.visible = false
          // 记录下当前方块存放的建筑物信息
          var newBuildingData = this.building(isoCoord.x, isoCoord.y, this.buildingTypeToBePlaced)
          this.buildingList.push(newBuildingData)
          console.log('redraw layer')
          // 重绘城市图层,把刚放下的建筑物在方格中绘制出来
          this.redraw(this.cityLayer, this.cityLayer.tiles)
        }
      },
      calculateBuildingsEffects () {
        // 根据当前建筑物，计算金币，钻石和人口数量
        this.powerSupplies = 10
        this.populations = 0
        this.coinGenerationCountDown = 90

        for (var i = 0, len = this.buildingList.length; i < len; i++) {
          var b = this.buildingList[i]
          var data = Constant[b.name]
          // 计算总人口
          this.evaluatePopulation(data.needPopulations)

          if (b.isConstructionDone) {
            this.evaluatePowerSupply(data.power)
            if (b.name === 'CoinsGenerator') {
              this.evaluateCoinsGeneration()
            }

            if (b.name === 'Merchant') {
              this.evaluateMerchant(b)
            }
          }
        }
      },
      evaluatePopulation (value) {
        this.populations += value
      },
      evaluatePowerSupply (value) {
        this.powerSupplies += value
      },
      evaluateCoinsGeneration () {
        this.coinGenerationCountDown -= 3
      },
      evaluateMerchant (building) {
        var b = building
        if (!b.diamonTick) {
          b.diamonTick = 0
        }

        b.diamonTick += 1
        if (b.diamonTick >= this.tickCountForMerchantDiamond) {
          if (this.coins >= this.coinsNeededForDiamond) {
            this.coins -= this.coinsNeededForDiamond
            this.popDiamond(b)
            b.diamondTick = 0
          }
        }
      },
      coinsTick () {
        this.coinGenerationCount += 1
        if (this.coinGenerationCount >= this.coinGenerationCountDown) {
          this.coins += 1
          this.coinGenerationCount = 0
        }

        this.calculateBuildingsEffects()
      },
      diamondSprite () {
        var container = new this.cjs.Container()
        var data = {
          framerate: 16,
          images: ['../../static/images/diamond-spritesheet.png'],
          frames: {width: 90, height: 90}
        }
        var spriteSheet = new this.cjs.SpriteSheet(data)
        var diamondSprite = new this.cjs.Sprite(spriteSheet)
        diamondSprite.gotoAndPlay(0)
        diamondSprite.scaleX = diamondSprite.scaleY = 0.5
        container.addChild(diamondSprite)
        container.on('click', function () {
          this.diamonds += 1
          this.stage.removeChild(container)
        }.bind(this))

        return container
      },
      // 在页面上弹出一个钻石
      popDiamond (building) {
        var screenCoord = this.isoToScreenCoord(building.x, building.y)
        var globalScreenCoord = this.cityLayer.localToLocal(screenCoord.x, screenCoord.y, this.stage)
        var diamond = this.diamondSprite()
        diamond.x = globalScreenCoord.x
        diamond.y = globalScreenCoord.y
        this.stage.addChild(diamond)
      },
      autoSave () {
        if (this.cjs.Ticker.getTicks() % 100 === 0) {
          localStorage['city.coins'] = this.coins
          localStorage['city.diamonds'] = this.diamonds
          localStorage['city.buildinglist'] = JSON.stringify(this.buildingList)
        }
      }
    }
  }
</script>

<style scoped>
</style>
