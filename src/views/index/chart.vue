<template>
  <!-- 统计模块 -->
  <div class="chart-container">
    <el-card class="box-card top"></el-card>
    <el-card class="box-card bottom"></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='less'>
.chart-container {
  .top {
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
  }
}
</style>