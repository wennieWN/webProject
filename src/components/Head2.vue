<!-- 头部组件样式2 -->

<template>
  <div>
    <div class="header">
      <div>基于人工智能的软件外包服务平台</div>
      <div class="drop">
        <el-dropdown>
         <span class="el-dropdown-link">
          个人中心<i class="el-icon-caret-bottom el-icon--right"></i>
         </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="changebox">
      <el-breadcrumb separator="/" >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ver'}">用户</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mver'}">管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header2",
};
</script>

<style>
.header {
  top: 0px;
  width: 100%;
  color: #323a45;
  padding-top:30px;
  margin-left: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  height: 50px;
}

.header .drop{
    margin-right: 30px;

}
  .changebox{
    margin-top: 30px;
    margin-left: 10%;
  }
</style>

