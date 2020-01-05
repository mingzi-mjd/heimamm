<template>
  <el-container class="index-container">
  <el-header>
    <div class="el-icon-s-fold header-icon"></div>
    <img class="left-img" src="../../assets/矢量智能对象 拷贝 9_1.png" alt="">
    <span class="header-title">黑马面面</span>
    <div class="right">
      <div class="right-portrait">
        <img src="" alt="">
      </div>
      <div class="right-name">李达,您好</div>
      <el-button class="right-btn" size="small" type="primary">退出</el-button>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  // 组件名称在插件中可以看到
  name: 'index'
}
</script>

<style lang='less'>
.index-container {
  height: 100vh;
  .el-header {
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 24px;
    height: 60px;
    .header-icon {
      font-size: 24px;
      margin-right: 22px;
    }
    .left-img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    .header-title {
      font-size: 22px;
      color: #49A1FF;
    }
    .right {
      display: flex;
    align-items: center;
      position: absolute;
      right: 0;
      .right-portrait {
        width: 43px;
        height: 43px;
        border-radius: 43px;
        background-color: yellowgreen;
        margin-right: 9px;
      }
      .right-name {
        font-size: 16px;
        color: #636363;
        margin-right: 38px;
      }
      .right-btn {
        margin-right: 20px;
      }
    }
  }
  .el-aside {
    background-color: yellow;
  }
  .el-main {
    background-color: antiquewhite;
  }
}
</style>