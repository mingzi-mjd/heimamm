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
        <el-form ref="sizeForm" :rules="rules" :model="sizeForm">
          <!-- element表单验证必须加上<el-form-item prop="name">标签才会有用 -->
          <el-form-item prop="name">
            <el-input class="form-username" v-model="sizeForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="form-password" v-model="sizeForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <div class="form-code-box">
            <el-form-item prop="code">
              <el-input class="form-code" v-model="sizeForm.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <div class="code-img">
              <img @click="changeImgURL" :src="imgURL" />
            </div>
          </div>
          <div class="checkbox">
            <el-checkbox v-model="sizeForm.checked">
              我已阅读并同意
              <el-link class="checkbox-a" :underline="false" type="primary">用户协议</el-link>和
              <el-link class="checkbox-a" :underline="false" type="primary">隐私条款</el-link>
            </el-checkbox>
          </div>
          <el-button class="form-login form-btn" type="primary" @click="submitForm('sizeForm')">登录</el-button>
          <el-button class="form-register form-btn">注册</el-button>
        </el-form>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/login_banner_ele.png" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// 验证手机号码---正则表达式
const verifyPhone = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("手机号码不能为空!"));
  } else {
    const regular = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (regular.test(value) == true) {
      // 正确
      callback();
    } else {
      // 错误
      callback(new Error("请输入正确的手机号码!"));
    }
  }
};
export default {
  // 组件名称在插件中可以看到
  name: "login",
  data() {
    return {
      imgURL: process.env.VUE_APP_BASEURL + "/captcha?type=login", // 验证码的路径
      sizeForm: {
        // element-ui表单绑定数据
        name: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        // 规则
        name: [
          // 用户名的规则
          { validator: verifyPhone, trigger: "blur" }
        ],
        password: [
          // 密码的规则
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度为6~12个字符",
            trigger: "blur"
          }
        ],
        code: [
          // 验证码的规则
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    changeImgURL() {
      // 图片点击事件
      this.imgURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(); // 加上1970.1.1到现在的毫秒数
    },
    submitForm(formName) {
      0;
      this.$refs[formName].validate(valid => {
        if (this.sizeForm.checked != true) {
          this.$message.warning("请勾选用户协议");
          return;
        }
        if (valid) {
          axios({
            url: process.env.VUE_APP_BASEURL + "/login",
            method: "post",
            withCredentials: true, // 携带cookie
            data: { phone: this.sizeForm.name, password: this.sizeForm.password, code: this.sizeForm.code }
          }).then(res => {
            //成功回调
            if (res.data.code == 200) {
              this.$message.success("登录成功");
            } else if(res.data.code == 202) {
              this.$message.success(res.data.message);
              this.changeImgURL();
            }
          });
          // this.$message.success("111"); // vue实例原型的方法---来自于element-ui
        } else {
          this.$message.warning("请检查输入格式");
          this.changeImgURL();
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang = 'less'>
.centainer {
  width: 100%;
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
      .form-username.el-input {
        height: 45px;
        input.el-input__inner {
          height: 45px;
        }
      }
      .form-password.el-input {
        height: 43px;
        input.el-input__inner {
          height: 43px;
        }
      }
      .form-code-box {
        height: 44px;
        display: flex;
        margin-bottom: 32px;
        .form-code {
          width: 284px;
          input.el-input__inner {
            height: 44px;
          }
        }
        .code-img {
          width: 110px;
          height: 42px;
          background-color: pink;
          img {
            width: 100%;
            height: 100%;
            /* 使点击时变成小手 */
            cursor: pointer;
          }
        }
      }
      .checkbox {
        height: 16px;
        line-height: 16px;
        margin-bottom: 28px;
        .checkbox-a {
          line-height: 16px;
          margin-bottom: 2px;
        }
      }
      .form-btn {
        width: 394px;
        height: 40px;
      }
      .form-login {
        margin-bottom: 26px;
      }
      .form-register {
        margin-left: 0;
      }
    }
  }

  .right > img {
    width: 100%;
    height: 100%;
  }
}
</style>