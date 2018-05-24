<template>
    <div class="home">
        <!-- 头部 -->

        <div class="head_home">
            <router-link to="/index">首页</router-link>
            <router-link to="/color">色彩</router-link>
            <router-link to="/index">搭配</router-link>
            <router-link to="/game">游戏</router-link>

            <div class="head_center">
                <span>Color Pop</span>
            </div>
        </div>
        <!-- 轮播 -->
        <div class="picshow">
        <el-carousel :interval="5000" arrow="always" :autoplay="false">
            <el-carousel-item :key="1">

            </el-carousel-item>
            <el-carousel-item :key="2">
            </el-carousel-item>
        </el-carousel>
        </div>

        <div class="main_content">
            <div class="home_flow">
                <div class="content">
                    <span style="font-family:'Xingkai SC'" v-on:click="toColor">
                    最美丨中国传统色彩
                    </span>
                    <div class="content_child">
                        <span style="font-family:'LingWai SC'">
                            建筑、服饰、绘画、瓷器、漆器、刺绣……中国传统文化的方方面面，承载着中国几千年的色彩文化和审美情趣。中国的色彩理念融合了自然、宇宙、伦理、哲学等等观念，形成了独特的中国色彩文化。
                        </span>
                    </div>
                </div>
                <img src="../assets/color.png">
            </div>

            <div class="home_flow">
                <img src="../assets/match.png">
                <div class="content">
                    <span style="font-family:'Xingkai SC'">
                    好看的色彩搭配
                    </span>
                    <div class="content_child">
                        <span style="font-family:'LingWai SC'">
                            色彩在平面设计中是作品中的灵魂。想运用好它一定要了解平面设计色彩搭配的知识。平面设计师与画家的区别在：平面设计师手中的颜料只有四管儿，但它可以依靠网点的疏密特性，调和出可感知的颜色。
                        </span>
                    </div>
                </div>
            </div>

            <div class="home_flow">
                <div class="content">
                    <span style="font-family:'Xingkai SC'" v-on:click="toGame">
                    关于颜色的游戏
                    </span>
                    <div class="content_child">
                        <span style="font-family:'LingWai SC'">
                            RGB色彩模式是工业界的一种颜色标准，是通过对红、绿、蓝三个颜色通道的变化以及它们相互之间的叠加来得到各式各样的颜色的。
                        </span>
                    </div>
                </div>
                <img src="../assets/game.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    methods:{
      toColor: function () {
          this.$router.push( {path:'/color'});
      },
      toGame: function () {
        this.$router.push( {path:'/game'});
      }
    },
    mounted: function() {

        document.querySelector('body').setAttribute('style', "background:#ffffff");
        //窗口滚动事件
        let beforeScroll = {
            'background-color': 'transparent',
            'color': '#ffffff',
            'border': 'none'
        };
        let afterScroll = {
            'background-color': '#ffffff',
            'color': '#323A45',
            'height': '65px',
            'border-bottom': '1px solid #DDD'
        };
        $(window).bind('scroll', function() {
            var topValue = $(window).scrollTop();
            if (topValue >= 390) {
                $('.head_home').fadeIn('slow');
                $('.head_home').css(afterScroll);
                $('.head_center > a').css({ 'color': '#323A45' });
            }
            else if (topValue < 400 && topValue > 10) {
                $('.head_home').fadeOut('slow');
            }
            else {
                $('.head_home').fadeIn('slow');
                $('.head_home').css(beforeScroll);
                $('.head_center > a').css({ 'color': '#ffffff' });
            }

        })
    }
}

</script>


<style scoped>

.main_content {
    margin: auto;
}

img {
    width: 200px;
    height: 200px;
}

.head_home {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 3;
    color: #ffffff;
    padding-top: 30px;
}

.content {
    padding-top: 20px;
    font-size: 1.5em;
    font-weight: bold;
    color: #8a8a8a;
    padding-left: 30px;
}

.home_flow {
    /* text-align: center; */
    border-bottom: 1px solid #DDD;
    height: 300px;
    padding-top: 30px;
    width: 65%;
    margin:auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.content_child {
    font-size: 22px;
    color: #667182;
    margin-top: 30px;
    width: 500px;
}

.head_home>a {
    margin-left: 30px;
    cursor: pointer;
    color: inherit;
}

.head_home :last-child {
    /* display: inline; */
    float: right;
    margin-right: 10px;
}

.head_center>a {
    margin-right: 10px;
    cursor: pointer;
}

.home_status {
    border-bottom: 1px solid #DDD;
    height: 113px;
    font-size: 1.5em;
    color: #657182;
}

.home_status>.el-row {
    text-align: center;
    margin-top: 30px;
}

.home >>> .el-carousel__item {
    background-image: url('../assets/index_head.png');
    /*background-repeat: no-repeat;*/
    background-size: 100% 100%;
    /*z-index: -1;*/
}
.home >>> .el-carousel__container {
    height: 400px;
}

.el-carousel__item .button_group {
    text-align: center;
    margin-top: 300px;
}

.button_group>.el-button {
    background-color: transparent;
    border-color: #ffffff;
    color: #ffffff;
    display: inline-block;
    width: 10%;
}
</style>
