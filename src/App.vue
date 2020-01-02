<template>
  <div>
    <a href="#/login">去login</a>
    <a href="#/index">去index</a>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 组件名称在插件中可以看到
  name: "app"
};
</script>

<style>
a {
  margin-right: 20px;
}
</style>