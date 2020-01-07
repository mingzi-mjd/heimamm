<template>
  <!-- 统计模块 -->
  <div class="chart-container">
    <el-card class="box-card top">
      <div class="big-box">
        <div class="round">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
      <div class="big-box">
        <div class="round">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
      <div class="big-box">
        <div class="round croci">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
      <div class="big-box">
        <div class="round croci">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
      <div class="big-box">
        <div class="round green">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
      <div class="big-box">
        <div class="round green">
          <span>20</span>
        </div>
        <span>呵呵呵</span>
      </div>
    </el-card>
    <el-card class="box-card bottom">
      <div class="title">整体数据</div>
      <div class="echartBox" ref="echartsBox"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const myChart = echarts.init(this.$refs.echartsBox);
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        right: 200,
        data: ["黑马", "阿里", "京东"],
        color: ["#f76137", "#f9b358", "#409eff"],
      },
      series: [
        {
          name: "整体数据",
          type: "pie",
          radius: ["40%", "70%"],
          color: ["#f76137", "#f9b358", "#409eff"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "黑马" },
            { value: 310, name: "阿里" },
            { value: 234, name: "京东" }
          ]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style lang='less'>
.chart-container {
  .top {
    height: 150px;
    display: flex;
    // align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
    .el-card__body {
      padding: 10px;
      margin: 0 auto;
      .big-box {
        // flex: 1;
        width: 100px;
        float: left;
        text-align: center;
        margin-right: 95px;
        span {
          color: #737373;
          font-size: 16px;
        }
        .round {
          width: 100px;
          height: 100px;
          border-radius: 100px;
          border: 2px solid rgba(0, 134, 250, 1);
          margin-bottom: 10px;
          text-align: center;
          span {
            color: #0086fa;
            line-height: 100px;
            font-size: 35px;
          }
        }
        .croci {
          border: 2px solid rgba(247, 97, 55, 1);
          span {
            color: rgba(247, 97, 55, 1);
          }
        }
        .green {
          border: 2px solid rgba(85, 205, 120, 1);
          span {
            color: rgba(85, 205, 120, 1);
          }
        }
      }
    }
  }
  .bottom {
    position: relative;
    height: 570px;
    .el-card__body {
      padding: 0;
      .title {
        padding-top: 34px;
        margin-left: 52px;
        font-size: 22px;
      }
      .echartBox {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>