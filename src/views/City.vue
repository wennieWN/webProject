<template>
    <div>
        <div class="head_home">
            <router-link to="/index">首页</router-link>
            <router-link to="/color">色彩</router-link>
            <router-link to="/index">搭配</router-link>
            <router-link to="/game">游戏</router-link>
            <router-link to="/city">城市</router-link>

            <div class="head_center">
                <span>Color Pop</span>
            </div>
        </div>
        <game-container style="margin-top: 7%;margin-left: 15%"></game-container>
    </div>

</template>

<script>
    import GameContainer from '../components/gamecontainer'
    export default {
        name: 'City',
        components: {
            GameContainer
        },
        mounted:function () {
            document.querySelector('body').setAttribute('style', "background:rgba(158,196,225,0.5)");
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
        },
    }
</script>

<style>
    .head_home {
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 3;
        color: #ffffff;
        padding-top: 30px;
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
</style>