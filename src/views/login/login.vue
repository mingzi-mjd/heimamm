<template>
  <div class="centainer">
    <div class="left">
      <div class="top">
        <div class="logo">
          <img src="../../assets/矢量智能对象 拷贝 9.png" />
        </div>
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="userLogin">用户登录</div>
      </div>
      <div class="content">
        <el-input class="phone" placeholder="请输入手机号码" prefix-icon="el-icon-user" v-model="phone"></el-input>
        <el-input
          class="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="password"
        ></el-input>
        <div class="code-box">
          <el-input class="code" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="code"></el-input>
          <div class="code-ico"></div>
        </div>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读并同意
          <el-link class="el-a" type="primary">用户协议</el-link>和
          <el-link class="el-a" type="primary">隐私条款</el-link>
        </el-checkbox>
        <div class="btn-login">
          <el-button type="primary">登录</el-button>
        </div>
        <div class="btn-register">
          <el-button type="primary">注册</el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/login_banner_ele.png" />
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称在插件中可以看到
  name: "login",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      checked: false
    };
  }
};
</script>

<style scoped lang = 'less'>
.centainer {
  display: flex;
  /* 主轴中间有空隙 */
  justify-content: space-around;
  /* 侧轴居中 */
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100vh;

  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;

    .top {
      display: flex;
      padding-top: 44px;
      align-items: center;
      margin-bottom: 27px;

      .logo {
        width: 22px;
        height: 17px;
        margin: 0 16px 0 48px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-right: 14px;

        font-size: 24px;
        font-weight: 400;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 14px;
      }
      .userLogin {
        font-size: 22px;
        font-weight: 400;
      }
    }

    .content {
      width: 394px;
      margin-left: 43px;

      .phone.el-input.el-input--prefix {
        margin-bottom: 25px;
        /deep/.el-input__inner {
          height: 45px;
        }
      }
      .password.el-input.el-input--prefix {
        margin-bottom: 26px;
        /deep/.el-input__inner {
          height: 43px;
        }
      }
      .code-box {
        display: flex;
        margin-bottom: 32px;
        .code.el-input.el-input--prefix {
          width: 284px;
          /deep/.el-input__inner {
            height: 44px;
          }
        }
        .code-ico {
          width: 110px;
          height: 42px;
          background-color: pink;
        }
      }
      .checkbox {
        sapn {
          font-size: 16px;
        }
        .el-a {
          visibility: initial;
        }
      }
      .btn-login {
        padding-top: 28px;
        margin-bottom: 26px;
        .el-button.el-button--primary {
          width: 394px;
          height: 40px;
        }
      }
      .btn-register {
        .el-button.el-button--primary {
          width: 394px;
          height: 40px;
        }
      }
    }
  }

  .right > img {
    width: 100%;
    height: 100%;
  }
}
</style>