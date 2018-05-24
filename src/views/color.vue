<template>
  <div>
    <div id="bgWrap">
    </div>
    <div id="container">

      <!--标题-->
      <article id="data1"style="text-align: center">
        <span style="color:white;font-size:100px;font-family:'Hannotate SC'">{{this.name}}</span><br><br>
        <span style="color:white;font-size:50px;font-family:'Hannotate SC'">{{this.pinyin}}</span><br><br>
      </article>


      <article id="data2">

        <!--CMYK-->
        <el-row>
          <el-col :span="2"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">C</span>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-transparent">
            <el-progress :show-text="false" :stroke-width="13" :percentage=this.C color="White" style="margin-top: 13px" ></el-progress><br>
          </div></el-col>
          <el-col :span="1"><div class="grid-content bg-transparent"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">{{this.C}}</span>
          </div></el-col>
        </el-row>

        <el-row>
          <el-col :span="2"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">M</span>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-transparent">
            <el-progress :show-text="false" :stroke-width="13" :percentage=this.M color="White" style="margin-top: 13px" ></el-progress><br>
          </div></el-col>
          <el-col :span="1"><div class="grid-content bg-transparent"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">{{this.M}}</span>
          </div></el-col>
        </el-row>

        <el-row>
          <el-col :span="2"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">Y</span>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-transparent">
            <el-progress :show-text="false" :stroke-width="13" :percentage=this.Y color="White" style="margin-top: 13px" ></el-progress><br>
          </div></el-col>
          <el-col :span="1"><div class="grid-content bg-transparent"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">{{this.Y}}</span>
          </div></el-col>
        </el-row>

        <el-row>
          <el-col :span="2"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">K</span>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-transparent">
            <el-progress :show-text="false" :stroke-width="13" :percentage=this.K color="White" style="margin-top: 13px" ></el-progress><br>
          </div></el-col>
          <el-col :span="1"><div class="grid-content bg-transparent"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-transparent">
            <span style="color:white;font-size:30px;font-family:'Hannotate SC'">{{this.K}}</span>
          </div></el-col>
        </el-row>
      </article>




      <nav id="colorContainer">
        <ul id="colors">
          <li :id="li_item.id" v-for="li_item in li_items"><div><a href="javascript:void(0);" v-on:click="change(li_item.rgb,li_item.name,li_item.pinyin,li_item.cmyk)">{{li_item.name}}</a></div></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>

  import TWEEN from "../js/tween.js"

  export default {
    name: 'color',
    methods:{
      change:function (rgb,name,pinyin,cmyk) {
//        document.querySelector('body').setAttribute('style', color);
//        this.bg=rgb;
        let color_css="background:rgb("+rgb[0]+","+rgb[1]+','+rgb[2]+')';
//        $("#bgWrap").css('background', color_css);
//        $("#bgWrap").css('background-image', 'url(../images/texture.png)');
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
//      $("#bgWrap").css('background', "rgb(244,121,131)");
//      document.querySelector('bgWrap').setAttribute('style', "background:rgb(244,121,131)");
      document.querySelector('body').setAttribute('style', "background:rgb(255,179,167)");
    },
    watch:{
//      bg:function () {
//        console.log("bg change");
//        let background=this.bg;
//        let color_css="background:rgb("+background[0]+","+background[1]+','+background[2]+')';
//        document.querySelector('body').setAttribute('style', color_css);
//      },
//      bg_new:function () {
//        //bg 旧值
//        //bg_new 新值
//        //bg 渐变->展示
//        console.log(this.bg)
//        function animate () {
//          if (TWEEN.update()) {
//            requestAnimationFrame(animate)
//          }
//        }
//        new TWEEN.Tween(this.bg)
//          .to(this.bg_new, 750)
//          .start();
//        animate();
//        console.log(this.bg);
//
//      }
    },
//    computed:{
//      //test
//      tweenedCSSColor:function () {
//        console.log("compute!");
//        console.log(this.bg)
//        return this.bg;
//      }
//    },
    data() {
      return{
        name:"桃红",
        C:0,
        M:66,
        Y:34,
        K:0,

        //旧值
        bg:[244,121,131],
        //新值
        bg_new:"",



        pinyin:'TAOHONG',
        li_items:[
          {name:'粉 红',pinyin:'FENHONG',id:"col001",rgb:[255,179,167],cmyk:[0,37,26,0]},
          {name:'妃 色',pinyin:'FEISE',id:"col002",rgb:[237,87,54],cmyk:[1,81,87,0]},
          {name:'绯 红',pinyin:'FEIHONG',id:"col003",rgb:[200,60,35],cmyk:[15,90,100,5]},
          {name:'桃 红',pinyin:'TAOHONG',id:"col004",rgb:[244,121,131],cmyk:[0,66,34,0]},
          {name:'海棠红',pinyin:'HAITANGHONG',id:"col005",rgb:[219,90,107],cmyk:[10,79,47,0]},
          {name:'胭 脂',pinyin:' YANZHI',id:"col006",rgb:[157,41,51],cmyk:[26,95,80,21]},
          {name:'樱桃色',pinyin:'YINGTAOSE',id:"col007",rgb:[201,55,86],cmyk:[16,93,57,3]},
          {name:'银 红',pinyin:'YINHONG',id:"col008",rgb:[240,86,84],cmyk:[0,81,65,0]},
          {name:'茜 色',pinyin:'QIANSE',id:"col009",rgb:[203,58,86],cmyk:[15,92,58,2]},
          {name:'绛 紫',pinyin:'JIANGZI',id:"col010",rgb:[140,67,86],cmyk:[37,81,50,20]},
        ]
      }
      }
  }
</script>

<style>
  @import '../css/color.css';
/*a{*/
  /*display: block;*/
  /*text-indent: -9999px;*/
  /*overflow: hidden;*/
  /*font-size: 1px;*/
  /*width: 50px;*/
  /*height: 278px;*/
  /*background-color: #FFF;*/
/*}*/

/*a:hover {*/
  /*background-color: #F596AA;*/
/*}*/
  .example-7-color-preview {
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .el-progress-bar__outer {
    background-color: transparent;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-transparent {
    background: transparent;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
