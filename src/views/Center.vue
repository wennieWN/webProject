<!-- 个人中心 -->
<template>
<div class="person_center">
<Head2></Head2>
<div class="main_content">

<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/center' }">个人中心</el-breadcrumb-item>
</el-breadcrumb>

<div class="menu">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-message"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-setting"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
</el-menu>
</div>

<div class="detail">
   <router-view/>

</div>

</div>
</div>

</template>

<script>
import Head2 from "../components/Head2";

export default {
  name: "Center",
  components: {
    Head2
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style>
.person_center .main_content {
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  cursor: pointer;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.person_center .menu {
  margin-top: 30px;
  display: inline-block;
}

.detail {
  display: inline-block;
  background-color: #eef1f6;
  color: #48576a;
  width: 80%;
  margin-left: 40px;
}
</style>
