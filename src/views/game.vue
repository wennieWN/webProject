<template>
  <div>

    <div class="head_home">
      <router-link to="/index">首页</router-link>
      <router-link to="/color">色彩</router-link>
      <router-link to="/index">搭配</router-link>
      <router-link to="/game">游戏</router-link>

      <div class="head_center">
        <span>Color Pop</span>
      </div>
    </div>

    <!--需要被击中的颜色-->
    <div class="topBar">
      <h1 id="current-color"></h1>
    </div>

    <!--主游戏界面-->
    <div class="mainPlaying">
      <div class="overlay">

        <!--包含小怪兽-->
        <div class="wrapper mainArea"></div>

        <!--四个上下跳动的星星-->
        <div class="star one"></div>
        <div class="star two"></div>
        <div class="star three"></div>
        <div class="star four"></div>

        <!--发射装置-->
        <div id="gunArea">
          <div>
            <img id="turret" src="../img/turretCannon.png" style="z-index: 500" />
          </div>
          <div>
            <img class="turretBody" src="../img/turretFront.png" style="visibility: hidden; z-index: 900" />
          </div>
          <div class="missileContainer">
            <img src="../img/missile.png" id="missile" style="display: none; z-index: 0; position: relative; left: 0; top: -130px;" />
          </div>
        </div>
      </div>
    </div>

    <!--云朵-->
    <div>
      <img id="cloud1" style="position: absolute; right: 50px; top: 520px" class="autor" src="../img/cloud.png" />
      <img id="cloud2" style="position: absolute; right: -100px; top: 600px" class="autor" src="../img/cloud2.png" />
      <img id="cloud3" style="position: absolute; right: -50px; top: 680px" class="autor" src="../img/cloud2.png" />
      <img id="cloud4" style="position: absolute; left: 50px; top: 520px" class="autol" src="../img/cloud2.png" />
      <img id="cloud5" style="position: absolute; left: -100px; top: 580px" class="autol" src="../img/cloud.png" />
      <!--<img id="roadImage" src="../img/Street.png" />-->
    </div>

    <!--地面-->
    <div class="bottomBar">
      <div class="container">

        <!--分数-->
        <div class="third">
          <h2 style="font-family: Chalkduster">Score</h2>
          <p id="points-container"><span id="points" style="font-family: Chalkduster;color: #FFFFFF">0</span></p>
          <div class="clearfix"></div>
        </div>

        <!--级别-->
        <div class="third meter">
          <div class="chart" data-percent="0"></div>
          <div class="level">
            <h4 style="font-family: Chalkduster">Level</h4>
            <p id="level" style="font-family: Chalkduster;color: #FFFFFF"><span id="Span1">0</span></p>
          </div>
        </div>

        <!--击杀个数-->
        <div class="third">
          <h2 style="font-family: Chalkduster">Invaders Destroyed</h2>
          <p id="kills-container"><span id="kills" style="font-family: Chalkduster;color: #FFFFFF">0</span></p>
        </div>

        <!-- 弹出框 -->
        <!--<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">-->


          <!--<div class="modal-body">-->
            <!--<div id="modal-page2" style="display: none">-->
              <!--<button type="button" class="close unpause" data-dismiss="modal" aria-hidden="true">×</button>-->
              <!--<h3 id="myModalLabel">Color Game</h3>-->
            <!--</div>-->
          <!--</div>-->

          <!--&lt;!&ndash;开始出现：Play now&ndash;&gt;-->
          <!--&lt;!&ndash;成功出现：Go to Next Level&ndash;&gt;-->
          <!--&lt;!&ndash;失败出现：Play again, Quit&ndash;&gt;-->
          <!--<div class="modal-footer">-->
            <!--&lt;!&ndash;通关后出现&ndash;&gt;-->
            <!--&lt;!&ndash;点击后，关闭当前弹窗&ndash;&gt;-->
            <!--<button class="btn unpause nextLevelBtn" data-dismiss="modal" aria-hidden="true">Go to Next Level</button>-->

            <!--&lt;!&ndash;开始时出现&ndash;&gt;-->
            <!--&lt;!&ndash;点击后，关闭当前弹窗&ndash;&gt;-->
            <!--&lt;!&ndash;相当于PLAY NOW && PLAY AGAIN&ndash;&gt;-->
            <!--<button class="btn newGameBtn" data-dismiss="modal" style="display: none" aria-hidden="true">Start New Game</button>-->

            <!--&lt;!&ndash;通关失败后出现&ndash;&gt;-->
            <!--&lt;!&ndash;点击后，关闭当前弹窗&ndash;&gt;-->
            <!--<button class="btn endGameBtn" data-dismiss="modal" style="display: none" aria-hidden="true">Quit</button>-->

          <!--</div>-->
        <!--</div>-->
        <!-- END MODAL -->

      </div>

    </div>


    <!--出现的首页面-->
    <!--<div class="splash active">-->
      <!--<div class="overlay">-->
        <!--<div class="logo">-->
          <!--<img src="../img/logoBig.png" />-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="description">THE WORLD NEEDS YOUR TYPICALLY USELESS SKILL OF HEX CODE KNOWLEDGE TO PREVENT THE INVASION!</div>&ndash;&gt;-->
        <!--<a class="freePlay" href="#">Free Play</a>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>

  export default {
    name: 'game',
    mounted:function () {
          document.querySelector('body').setAttribute('style', "background:#FFFFFF");

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
    methods:{
      change:function (rgb,name,pinyin,cmyk) {
//        document.querySelector('body').setAttribute('style', color);
//        this.bg=rgb;
        let color_css="background:rgb("+rgb[0]+","+rgb[1]+','+rgb[2]+')';
        document.querySelector('body').setAttribute('style', color_css);
        this.bg_new=rgb;
        this.name=name;
        this.pinyin=pinyin;
        this.C=cmyk[0];
        this.M=cmyk[1];
        this.Y=cmyk[2];
        this.K=cmyk[3];
      }
    },
    mounted:function () {
      document.querySelector('body').setAttribute('style', "background:#ffffff");
      //开始载入的JS
      $(document).ready(function () {
        // Classes

        // level:等级 score:分数 color:问题 answer:答案 countdown：距离地面的高度
        // todo:invadersKilled aliensForLevel totalKills
        function Game(level, colors, answer, countdown, invadersKilled, score, aliensForLevel,totalKills) {
          this.level = level;
          this.colors = colors;
          this.answer = answer;
          this.countdown = countdown;
          this.invadersKilled = invadersKilled;
          this.score = score;
          this.aliensForLevel = aliensForLevel;
          this.totalKills = totalKills;
        }

        // color:小怪兽的颜色
        // alienIndex:小怪兽的编号
        // todo:xoffset yoffset name countDown alienIndex
        function Invader(color, xoffset, yoffset, name,countDown,alienIndex) {
          this.alienIndex = alienIndex;
          this.color = color;
          this.xoffset = xoffset;
          this.yoffset = yoffset;
          this.name = name;
          //this.scale=(($(window).width()+1000)/1000)/(currentGame.aliensForLevel);

          this.positioncss = this.xoffset >= 0 ? 'right:' + this.xoffset + 'px">' : 'left:' + (-this.xoffset) + 'px';
          this.colorcss = "fill:' + this.color + ';stroke:' + this.color + ';stroke-width:5;fill-rule:nonzero;";

          //出现错误时，显示小怪兽当前颜色
          this.colorLabel = '<div style="color: #ffffff;visibility: hidden;" class="invaderLabel">' + this.color + '</div>';

          //小怪兽的代码
          this.invaderHtml = ( (this.alienIndex % 2 === 0)?
            //第一种小怪兽的HTML代码
            '<svg version="1.1" id="' + this.name + 'x="0px" y="0px" width="'+pageScale*160+'px" height="'+pageScale*160+'px" viewBox="0 0 160 160" enable-background="new 0 0 160 160" xml:space="preserve">' +
            '<g>' +
            '<g>' +

            '<polygon class="invader mainInvaderColor"  fill-rule="evenodd" clip-rule="evenodd"  style="fill:' +  this.color + ';"  stroke="rgba(255, 251, 240,0.6)" stroke-width="8" stroke-miterlimit="10" points="78.282,10.577 21.748,41.093 21.748,98.309 78.282,129.023 140.584,99.113 140.584,41.895 		"/>' +
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M93,95c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +

            '</g>' +
            '</g>' +
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M65,52c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M124,52c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +

            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M35,109.5"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M62,120c-9.048-5.928-16.728,8.928-16.176,20.25c0.442,9.058,8.143,16.042,17.2,15.6c7.246-0.354,12.833-6.513,12.48-13.76c-0.283-5.797-5.211-10.267-11.008-9.984c-4.637,0.227-8.213,4.17-7.987,8.807"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M50.5,123.438c-1.407,7.892-27.52,31.792-35.458,30.688c-6.351-0.884-10.784-6.749-9.9-13.1c0.707-5.081,5.399-8.627,10.48-7.92c4.065,0.565,6.901,4.318,6.336,8.384"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M98.584,119.501c9.206-5.68,17.027,7.76,16.475,19.082c-0.441,9.058-8.143,16.042-17.199,15.6c-7.246-0.354-12.834-6.513-12.48-13.76c0.283-5.797,5.211-10.267,11.008-9.984c4.638,0.227,8.214,4.17,7.988,8.807"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M110.217,122.333c1.104,7.939,27.686,31.229,35.625,30.125c6.352-0.884,10.783-6.749,9.9-13.1c-0.707-5.081-5.399-8.627-10.48-7.92c-4.064,0.565-6.901,4.318-6.336,8.384"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M43.25,9.216c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +
            '<path class="invader"  fill="none" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M115.967,9.341c0.552,6.351,6.148,11.052,12.5,10.5c5.08-0.442,8.842-4.919,8.399-10c-0.354-4.065-3.935-7.073-8-6.72c-3.252,0.283-5.659,3.148-5.376,6.4c0.227,2.601,2.519,4.527,5.12,4.301c2.081-0.181,3.622-2.015,3.44-4.096"/>' +
            '</svg>'
            :
            //第二种小怪兽的HTML代码
            '<svg version="1.1" id="' + this.name + ' x="0px" y="0px"width="'+pageScale*160+'px" height="'+pageScale*160+'px" viewBox="0 0 160 160" enable-background="new 0 0 160 160" xml:space="preserve">' +
            '<g  >' +
            '<g>' +
            '<g>' +
            '<polygon class="invader mainInvaderColor"  fill-rule="evenodd" clip-rule="evenodd"  style="fill:' +  this.color + ';"  stroke="rgba(255, 251, 240,0.6)" stroke-width="8" stroke-miterlimit="10" points="79.532,10.16 22.998,40.676 22.998,97.893 79.532,128.607 141.834,98.697 141.834,41.478 			"/>' +
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M93,95c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +
            //                    	'<ellipse cx="82" cy="90" rx="38" ry="23" style="fill:#ffffff;stroke:#000000;stroke-width:2" />'+
            //                    	'<ellipse cx="68" cy="91" rx="10" ry="13" style="fill:#ffffff;stroke:#000000;stroke-width:2" />'+
            //                		'<ellipse cx="95" cy="91" rx="10" ry="13" style="fill:#ffffff;stroke:#000000;stroke-width:2" />'+

            '</g>' +
            '<path  class="invader"  fill="none"  stroke="#FFFFFF"stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M30.496,106.117c0,0-10.09,14.518-3.105,20.258c6.984,5.738,18.238,26.67,3.105,29.709"/>' +
            '<path  class="invader"  fill="#FFFFFF"  stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M63.479,120.973c0,0-10.089,14.518-3.104,20.258c6.984,5.738,10.089,6.076,6.984,11.814"/>' +
            '<path  class="invader"  fill="#FFFFFF"  stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M102.957,119.623c0,0,10.09,14.514,3.105,20.256c-6.983,5.738-10.087,6.076-6.983,11.814"/>' +
            '<path  class="invader"  fill="#FFFFFF"  stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M135.553,104.094c0,0,10.09,14.514,3.104,20.254c-6.983,5.738-19.305,25.32-4.558,29.711"/>' +
            '</g>' +
            //	antennae
            '<path  class="invader"  fill="none"  stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M56.776,22.919C52.42,20.371,60.256,10.381,44.5,8.799C42.352,8.583,28.625,14.253,28.625,3"/>' +
            '<path  class="invader"  fill="none"  stroke="#FFFFFF"stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M103.982,23.275c4.356-2.547-3.479-12.537,12.274-14.119c2.148-0.215,15.877,5.454,15.877-5.799"/>' +

            '</g>' +
            //eyes
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M65,52c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +
            '<path fill="#FFFFFF" stroke="#FFFFFF"  stroke-width="4" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10" d="M124,52c-0.552,6.351-6.149,11.052-12.5,10.5c-5.081-0.442-8.842-4.919-8.4-10c0.354-4.065,3.935-7.073,8-6.72c3.252,0.283,5.659,3.148,5.376,6.4c-0.226,2.601-2.519,4.527-5.12,4.301c-2.081-0.181-3.622-2.015-3.44-4.096"/>' +

            '</svg>');

          //出现错误时，出现盾牌
          this.shieldHtml = '<span class="shield ' + this.color + '"style="visibility: hidden;">' +
            '<svg version="1.1" id="Layer_1" x="0px" y="0px" width="'+pageScale*160+'px" height="'+pageScale*40+'px" viewBox="0 0 160 40" enable-background="new 0 0 160 40" xml:space="preserve">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M157.107,22.239c-13.046,7.446-42.496,12.643-76.759,12.643c-34.629,0-64.354-5.306-77.183-12.881c-1.526,1.084-2.348,2.22-2.348,3.388c0,7.73,35.442,13.995,79.163,13.995c43.72,0,79.165-6.265,79.165-13.995C159.146,24.306,158.426,23.252,157.107,22.239z"/>' +
            '<path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M157.147,11.087c-13.046,7.446-42.496,12.641-76.76,12.641c-34.628,0-64.354-5.306-77.181-12.88c-1.526,1.085-2.348,2.219-2.348,3.387c0,7.731,35.442,13.997,79.162,13.997c43.719,0,79.163-6.266,79.163-13.997C159.184,13.152,158.467,12.1,157.147,11.087z"/>' +
            '</svg>'+
            '</span>';

          //小怪兽的HTML代码
          this.html = ('<span class="space"  style="width:'+pageScale*160+'px; top: '+(300 - (currentGame.countdown * ((currentGame.aliensForLevel>4&& $(window).width()<1000)?3:5))) + 'px;">' + this.colorLabel + this.invaderHtml + this.shieldHtml+'</span>');

        }

        let cheatMode = false;


        //游戏介绍
        let introHtml = "<h1>Color Game</h1> <h3>To destroy the invader that matches the supplied hex code at the top of your screen.</h3><hr>" +
          "<ol><li>Hex codes are based on the combination of Red, Green, and Blue. To the right you can see that each of the three colors is represented with two out of the six numbers.</li><li>The color intesity ranges from 0 (no color) to F (all the color). So if you are supplied a color of #00ff00, there is no red or blue, but all the green.</li></ol>";

        //每个level需要击杀小怪兽的个数
        let invadersPerLevel;

        let flashCounter;
        let paused = true;
        let currentClickColor = "";
        let missileInAir = false;
        let pageScale = .9;

        //新建一个游戏

        //1。随机获得颜色
        let currentColors = get_random_color(1);

        //2。创建第一个游戏
        // answer:在颜色中随机抽取一个
        let currentGame = new Game(1, currentColors, currentColors[Math.floor(Math.round(Math.random() * currentColors.length-1))], 60, 0, 0,determineNumberOfAliens(1),0);
        //ID为points：当前游戏的分数
        $("#points").text(currentGame.score);
        //ID为kills：当前游戏的总击杀数
        $("#kills").text(currentGame.totalKills);

        //设置路的长度
//        $('#roadImage').attr("width", $(window).width());

        generate_level();
        let moveInvaderInterval = setInterval(function() { moveInvaders(); }, 1600);

        //白云运动
        moveAutos();

        $(window).resize(function() {

          $('#roadImage').attr("width", $(window).width());
          generate_level();
        });





        // continue game on modal close
        $('.unpause').click(function() {
          paused = false;
        });


        generate_level();

        $('.nextLevelBtn').click(function(e) {
          e.preventDefault();
          $('.modal-body').html(introHtml);
        });


        $('.freePlay').click(function(e) {
          e.preventDefault();
          $('.nextLevelBtn').hide();
          $('.newGameBtn').show();
          $('.newGameBtn').html('Play Now');
          $('.modal-header').html("<h2>Welcome!!!!</h2>");
          $('.modal-body').html(introHtml);
          showModal();
        });

        // continue game on modal close
        $('.newGameBtn').click(function() {
          paused = false;
          clockDisplayedThisLevel = false;
          currentColors = get_random_color(1);

          currentGame = new Game(1, currentColors, currentColors[Math.floor(Math.round(Math.random() * currentColors.length-1))], 60, 0, 0,determineNumberOfAliens(1),0);
          $("#points").text(currentGame.score);
          $("#kills").text(currentGame.totalKills);
          generate_level();
          clearInterval(moveInvaderInterval);

          moveInvaderInterval=setInterval(function() { moveInvaders(); }, 1200);
        });


        // Page Events
        // generate aliens for level
        function generate_level() {
          pageScale = 0.2 + ((2 / (currentGame.aliensForLevel))*(($(window).width()) / 2000))>.9?.9: 0.2 + ((2 / (currentGame.aliensForLevel))*(($(window).width()) / 2000));

          //每个level需要击杀小怪物的个数
          invadersPerLevel = currentGame.level + 3;
          $('.wrapper').html(getAllAliensForLevel(currentGame.aliensForLevel,currentGame.colors));
          bindClickEvent();


          let colorArray = new Array();
          $(".mainInvaderColor").each(function() {
            if($(this).css("fill").indexOf("#")>=0)
              colorArray.push($(this).css("fill"));
            else
              colorArray.push(colorToHex($(this).css("fill")));
          });
          let temp = currentGame.answer;
          while(temp == currentGame.answer) {
            let randomInvaderId = Math.floor(Math.random() * currentGame.aliensForLevel);
            currentGame.answer = colorArray[randomInvaderId];
            $("#current-color").text(currentGame.answer);
            if(cheatMode)
              $("#current-color").css('color', currentGame.answer);// Cheat Mode
            else {
              $("#current-color").css('color', "#FFFFFF");// Cheat Mode

            }
          }
          $('#level').html(currentGame.level);
          $('#score').html(currentGame.score);
          missileInAir = false;
        }

        // binding click event after new invaders generated
        function bindClickEvent() {
          //class:space
          $(".space").click(function (e) {
            if(!missileInAir) {
              missileInAir = true;
              rotateTurret(e);
              currentClickColor = $("polygon", this)[0].style.fill;
              if (currentClickColor.indexOf("#") < 0)
                currentClickColor = colorToHex(currentClickColor);
              let hit = (currentClickColor.toUpperCase() == currentGame.answer.toUpperCase());
              //|| itemColor.toUpperCase() == "RGB(" + hexToRgb(currentGame.answer).r + ", " + hexToRgb(currentGame.answer).g + ", " + hexToRgb(currentGame.answer).b + ")"
              fireMissile(e, hit);
            }
          });
        }


        // Game actions
        //goto next level... whatever that means
        function gotoNextLevel() {
          $('.endGameBtn').hide();
          $('.newGameBtn').hide();
          $('.nextLevelBtn').show();
          $('.modal-social').hide();
          $('.nextLevelBtn').html('Go to Next Level');
          $('.modal-header').html("<h2>Congratulations!!</h2>");
          $('.modal-body').html("<h3>You have Completed Level " + currentGame.level+".</h3>");
          setTimeout(function() {
            showModal();
          }, 800);
          currentGame.level++;

          currentGame.aliensForLevel = determineNumberOfAliens(currentGame.level);
          currentGame.invadersKilled = 0;
          currentGame.countdown = 60;
          if(flashCounter<15) setTimeout(function() { 	flashCounter++;
            $('.invader').css('fill', currentGame.colors[Math.floor(Math.round(Math.random() * currentColors.length - 1))]);
            $('.invader').css('stroke', currentGame.colors[Math.floor(Math.round(Math.random() * currentColors.length - 1))]);randomizeAllInvaderColors(); },75);
          else {
            currentGame.colors=get_random_color(currentGame.level);
          }

//          $('.chart').data('easyPieChart').update(0);
        }

        //display Modal Popup
        function showModal() {
          $('#myModal').modal({
            backdrop: 'static'
          });
          paused = true;
        }

        // function to handle end of game
        function gameOver() {
          $('.endGameBtn').show();
          $('.newGameBtn').html('Play Again');
          $('.newGameBtn').show();
          $('.nextLevelBtn').hide();
          $('.modal-social').show();
          $('.modal-header').html("<h2>Game Over!!!!</h2>");
          setTimeout(function() {
            showModal();
          }, 1100);
        }

        //成功击中函数
        function SuccessfulAttack() {
          flashCounter = 0;

          // 分数加十
          currentGame.score = currentGame.score + 10;
          // 显示分数
          $("#points").text(currentGame.score);

          //该局击杀数加一
          currentGame.invadersKilled++;

          //总击杀数加一
          currentGame.totalKills++;
          //显示总击杀数
          $("#kills").text(currentGame.totalKills);

          //该局已完成百分比
          let levelPercent = (((currentGame.invadersKilled / invadersPerLevel) * 100) + "%");
          //显示百分比
//          $('.chart').data('easyPieChart').update(levelPercent);

          //该局击杀数>=该局需要击杀数时，去下一个level
          if(currentGame.invadersKilled>=invadersPerLevel) gotoNextLevel();

          //todo：randomizeAllInvaderColors
          else {
            randomizeAllInvaderColors(true);
          }
        }

        //未击中正确的小怪兽
        function failedAttack() {

          //小怪兽与地面距离减2
          currentGame.countdown= currentGame.countdown-2;
          //移动小怪兽
          moveInvaders();

          // Player lost this round
          let divName = "code" + currentClickColor;
          $(".invaderLabel").each(function() {
            if($(this).html()==currentClickColor) {
              $(this).css('visibility','visible');
            }
          });

          // Subtract points from user
          currentGame.score = currentGame.score - 10;
          $("#points").text(currentGame.score);
          setTimeout(function() {$(".invaderLabel").css('visibility','hidden'); }, 3000);
          setTimeout(function() {	$(".shield").css('visibility','hidden'); }, 1000);
          missileInAir = false;
        }



        //converts hex color to it's equivelant rgb value
        function hexToRgb(hex) {
          let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
          });

          let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        };

        //converts rgb color to it's equivelant hex value
        function colorToHex(color) {
          if (color.substr(0, 1) === '#') {
            return color;
          }
          let digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

          let red = (parseInt(digits[2]).toString(16).length==1?"0":"")+parseInt(digits[2]).toString(16);
          let green = (parseInt(digits[3]).toString(16).length==1?"0":"")+parseInt(digits[3]).toString(16);
          let blue =(parseInt(digits[4]).toString(16).length==1?"0":"")+parseInt(digits[4]).toString(16);

          let newHex = '#' + red + green + blue;;
          return  newHex;
        };


        // Generate a random color
        // 根据等级生成颜色
        function get_random_color(level) {
          let colorsNeeded = determineNumberOfAliens(level);
          let complexityfactor = (128 / (Math.ceil(level / 4)));
          console.log(complexityfactor)
          if(complexityfactor<2) complexityfactor = 2;
          let colors = new Array();
          for(let n=0;n<colorsNeeded;n++) {
            let colorArray = [128, 128, 128];
            for (let i = 0; i < 3; i++) {
              colorArray[i] = Math.floor((complexityfactor * Math.floor(Math.random() * ((256/complexityfactor)+1))));
              if (colorArray[i]>255) colorArray[i] = 255;
            }
            //set 2 values to zero for level 1
            if(level==1) {
              let untouched = Math.round(Math.random() * 2);
              for (let y = 0; y < 3; y++) {
                if(y!=untouched)
                  colorArray[y] = 0;
              }
            }
            // set one value to 0 for level 2
            if(level==2) {
              colorArray[Math.floor(Math.random() * 3)]=0;
            }
            let color = '#';
            for (let x = 0; x < 3; x++) {
              let colorString = colorArray[x].toString(16);
              color+= (colorString.length==1?"0":"")+colorString;
            }
            let duplicate = colors.indexOf(color);
            colors[n] = color;
            if(duplicate>=0 || color=="#000000"||color.length!=7) n--;
          }
//				if(level===1||2){
//
//				}
          return colors;
        };

        //确定小怪兽的个数
        //level<=5 3个
        //level>=6 level<=9 4个
        //level>=10 5个
        function determineNumberOfAliens(level) {
          let alienCount =(level >= 10 ? 5 : (level >= 6 ? 4 : 3));
          return alienCount;
        }

        // returns html for all alliens for level
        function getAllAliensForLevel(numberOfAliens, colors) {
          let alienHtml = '';
          for (let i = 0; i < numberOfAliens; i++) {
            let newAlien = new Invader(colors[i], 0, 0, "bob" + i,currentGame.countdown,i);
            alienHtml += newAlien.html;
          }
          return alienHtml;
        }


        // 小怪兽下移
        function moveInvaders() {

          //todo:paused

          paused=false;
          console.log(currentGame.countdown);
          if (!paused){
            currentGame.countdown--;

            //如果与地面距离为0 游戏结束
            if (currentGame.countdown <= 0) gameOver();

            //小怪兽下移
            else {
              //class:space 小怪兽的每个元素都变化
              $(".space").each(function() {

                console.log(currentGame.countdown);
                //todo：aliensForLevel
                let newtopIndex = (300 - (currentGame.countdown * ((currentGame.aliensForLevel>4&& $(window).width()<1000)?3:5))) + 'px';
                $(this).css("top", newtopIndex);
                let leftIndex = parseInt($(this).css("left").split("px")[0]) + ((Math.pow(-1, currentGame.countdown)) * 20);
                $(this).css("left", leftIndex + "px");
              });
            }
          }
        }

        function beautyColor_1() {
          let color_array=['#EFCEE8','#F3D7B5','#FDFFDF','#DAF9CA','#C7B3E5'];
          let index=Math.floor(Math.round(Math.random() * color_array.length - 1));
          return color_array[index];
        }
        function beautyColor_2() {
          let color_array=['#EFCEE8','#F3D7B5','#FDFFDF','#DAF9CA','#C7B3E5'];
          let index=Math.floor(Math.round(Math.random() * color_array.length - 1));
          return color_array[index];
        }
        function beautyColor_3() {
          let color_array=['#EFCEE8','#F3D7B5','#FDFFDF','#DAF9CA','#C7B3E5'];
          let index=Math.floor(Math.round(Math.random() * color_array.length - 1));
          return color_array[index];
        }

        // make all invaders cycle through all colors in current pallette
        function randomizeAllInvaderColors(newLevel) {
          if(flashCounter<1) setTimeout(function() { 	flashCounter++;
//					$('.mainInvaderColor').css('fill', currentGame.colors[Math.floor(Math.round(Math.random() * currentColors.length - 1))]);
            $('.mainInvaderColor').css('fill', "#4B5CC4");
//					$('.invader').css('stroke', currentGame.colors[Math.floor(Math.round(Math.random() * currentColors.length - 1))]);
            $('.invader').css('stroke', "#FFFFFF");
            randomizeAllInvaderColors(); },75);
          else {
            $('.mainInvaderColor').css('fill', "#4B5CC4");
            $('.invader').css('stroke', "#FFFFFF");
            currentGame.colors=get_random_color(currentGame.level);
            setTimeout(function() {
              generate_level();
            }, 200);
          }
        }

        // Player Helpers
        // function to aim turret at mouse click
        function rotateTurret(e) {
          let mouseX = e.pageX;
          let mouseY = e.pageY;
          let img= $('#turret');
          let offset = img.offset();
          let centerX = (offset.left) + (img.width()/2);
          let centerY = (offset.top) + (img.height()/2);
          let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
          let angle = (radians * (180 / Math.PI) * -1) + 180;
          $('#turret').css("-webkit-transform", "rotate("+ angle + "deg)");
          $('#turret').css("-moz-transform", "rotate("+ angle + "deg)");
          $('#turret').css("-ms-transform", "rotate("+ angle + "deg)");
          $('#missile').css("-webkit-transform", "rotate("+ angle + "deg)");
          $('#missile').css("-moz-transform", "rotate("+ angle + "deg)");
          $('#missile').css("-ms-transform", "rotate("+ angle + "deg)");
          $('.turretBody').css("-webkit-transform", "rotate("+ 0 + "deg)");
          $('.turretBody').css("-moz-transform", "rotate("+ 0 + "deg)");
          $('.turretBody').css("-ms-transform", "rotate("+ 0 + "deg)");
        }

        //function to fire missile at invader
        function fireMissile(e,hit) {

//				playAudio(fireSound, false);
          let mouseX = e.pageX;
          let mouseY = e.pageY;
          let img= $('.turretBody');
          let offset = img.offset();
          let centerX = (offset.left) + (img.width()/2);
          let centerY =  (offset.top) + (img.height()/2);
          let xdiff = mouseX - centerX;
          let ydiff = Math.abs(mouseY - centerY);
          let slope = ydiff / xdiff;
          if(!hit) ydiff = ydiff - 85;
          moveMissile(centerX,centerY,ydiff,slope,0,hit);
          if(!hit) {
            $(".shield").each(function() {
              if ($(this).hasClass(currentClickColor)) {
                $(this).css('visibility','visible');
              }
            });
          }
        }

        //子弹的飞射
        function moveMissile(xstart,ystart,ydiff,slope,currenty,hit) {
          if(currenty<-165)
            $('#missile').show();
          currenty=currenty-(5);
          $('#missile').css("top",   (-130) + currenty+"px");
          $('#missile').css("left",  ((-currenty)/slope) +"px" );
          if((Math.abs(currenty)<=ydiff))
          {
            setTimeout(function() { moveMissile(xstart, ystart, ydiff, slope, currenty,hit); }, 1);
          }
          else {
            $('#missile').hide();
            $('#missile').css("top",  "-130px");
            $('#missile').css("left", "0px");

            if(hit) {
              SuccessfulAttack();
            }
            else {
              failedAttack();
            }
          }
        }


        //所有白云运动
        function moveAutos() {
            $('.autol').each(function() { animatethis($(this),true); });
            $('.autor').each(function() { animatethis($(this),false); });
        }

        //单个白云运动函数
        function animatethis(targetElement, left) {
          let distance = $(document.body).width();
          let move = "+=" + distance + "px";
          let negMove="-=" + distance + "px";
          let tankSpeed =Math.random()*10000+Math.random()*10000+Math.random()*10000+Math.random()*10000+5000;

          //(selector).animate({styles},speed,easing,callback)
          $(targetElement).animate({ marginLeft: (left ? move: "0px"), marginRight: (left ? "0px" : move)},
            {
              duration: tankSpeed,
              easing:"linear",
              complete: function ()
              {
                targetElement.animate({ marginLeft: (left ? negMove: "0px"), marginRight: (left ? "0px" : negMove)},
                  {
                    duration: tankSpeed,
                    easing:"linear",
                    complete: function ()
                    {
                      animatethis(targetElement, left, distance);
                    }
                  });
              }
            });
        }

        // social media stuff
        $('#fb-post').click(function(e) {
          e.preventDefault();
          FB.ui({
            method: 'feed',
//					link: siteURL,
//					picture: siteURL+'/img/logobig.png',
            name: 'Hex Invaders',
            caption: 'Saving the World, one color at a time.',
            description: 'I just got to Level '+currentGame.level+' with a score of '+currentGame.score+'.'
          }, function(response) {
          });

        });
      });
      $(function() {
        $("a.freePlay").click(function() {
          $('.splash').removeClass("active");
        });
      });

      //引用jqFloat，使星星上下跳动
//      $(document).ready(function() {
//        $('.star').jqFloat({
//          width: 0,
//          height: 20,
//          speed: 800
//        });
//      });

    },


  }
</script>

<style scoped>
  @import '../css/game.css';
  @import '../css/bootstrap.css';

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
