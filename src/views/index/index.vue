<template>
  <el-container class="index-container">
    <el-header>
      <div @click="headerIcon" class="el-icon-s-fold header-icon"></div>
      <img class="left-img" src="../../assets/矢量智能对象 拷贝 9_1.png" alt />
      <span class="header-title">黑马面面</span>
      <div class="right">
        <div class="right-portrait">
          <img :src="rightInfo.avatar" alt />
        </div>
        <div class="right-name">{{rightInfo.username}},您好</div>
        <el-button class="right-btn" size="small" type="primary" @click="exitClick">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-menu
        class="el-menu-vertical-demo"
        default-active="1-4-1"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
      >
        <el-menu-item index="/index/chart">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">数据概览</span>
        </el-menu-item>
        <el-menu-item index="/index/user">
          <i class="el-icon-user"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
        <el-menu-item index="/index/question">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">题库列表</span>
        </el-menu-item>
        <el-menu-item index="/index/enterprise">
          <i class="el-icon-office-building"></i>
          <span slot="title">企业列表</span>
        </el-menu-item>
        <el-menu-item index="/index/subject">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">学科列表</span>
        </el-menu-item>
      </el-menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, logout } from "../../api/login";
import { removeToken } from "../../utils/token.js";
export default {
  // 组件名称在插件中可以看到
  name: "index",
  data() {
    return {
      rightInfo: {},
      flag: false,
      isCollapse: false
    };
  },
  created() {
    getInfo().then(res => {
      //成功回调
      window.console.log(res);
      this.rightInfo = res.data.data;
      this.rightInfo.avatar =
        process.env.VUE_APP_BASEURL + "/" + this.rightInfo.avatar;
    });
  },
  methods: {
    exitClick() {
      this.open();
    },
    open() {
      this.$confirm("即将退出登录, 是否继续?", "提示", {
        center: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code == 200) {
              removeToken();
              this.$message({
                type: "success",
                center: true,
                message: "退出成功!"
              });
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            center: true,
            message: "已取消退出登录"
          });
        });
    },
    headerIcon() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  }
};
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
      cursor: pointer;
    }
    .left-img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    .header-title {
      font-size: 22px;
      color: #49a1ff;
    }
    .right {
      display: flex;
      align-items: center;
      position: absolute;
      right: 20px;
      .right-portrait {
        margin-right: 10px;
        width: 43px;
        height: 43px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 43px;
        }
      }
      .right-name {
        font-size: 16px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }
  .el-aside {
    border-top: 1px solid #ccc;
  }
  .el-main {
    background-color: #cccccc;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>