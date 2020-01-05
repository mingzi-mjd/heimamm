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
            <el-input
              prefix-icon="el-icon-user"
              class="form-username"
              v-model="sizeForm.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              class="form-password"
              v-model="sizeForm.password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <div class="form-code-box">
            <el-form-item prop="code">
              <el-input
                prefix-icon="el-icon-key"
                class="form-code"
                v-model="sizeForm.code"
                placeholder="请输入验证码"
              ></el-input>
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
          <el-button class="form-register form-btn" @click="dialogFormVisible = true">注册</el-button>
        </el-form>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/login_banner_ele.png" />
    </div>

    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      width="600px"
      :center="true"
      top="10vh"
      custom-class="form-title"
    >
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="formContent">
        <el-form-item label="头像" class="updata" prop="updata">
          <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input v-model="registerForm.avatar" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userName">
          <!--加上规则自动拥有小红星  -->
          <el-input prefix-icon="el-icon-user" v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input prefix-icon="el-icon-message" v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input prefix-icon="el-icon-phone" v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图形码" class="graphic-box" prop="graphic">
          <el-input prefix-icon="el-icon-key" v-model="registerForm.graphic" autocomplete="off"></el-input>
          <div class="graphic">
            <img :src="graphicUrl" @click="changeGraphicURL" />
          </div>
        </el-form-item>
        <el-form-item label="验证码" class="phoneCode-box" prop="phoneCode">
          <el-input
            prefix-icon="el-icon-mobile"
            v-model="registerForm.phoneCode"
            autocomplete="off"
          ></el-input>
          <el-button
            @click="phoneCode"
            :disabled="rockon!=0"
            class="phoneCode"
          >获取验证码{{ rockon != 0 ? rockon + "S" : "" }}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerClick" :disabled="flag!=true">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, registerBtn, registerMessage } from "../../api/login.js";
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
// 注册邮箱验证
const emailRule = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("邮箱不能为空!"));
  } else {
    const rule = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (rule.test(value) == true) {
      callback();
    } else {
      callback(new Error("请输入正确的邮箱地址!"));
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
      },

      actionUrl: process.env.VUE_APP_BASEURL + "/uploads",
      imageUrl: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      registerForm: {
        userName: "",
        phoneCode: "",
        graphic: "",
        userPassword: "",
        phone: "",
        email: "",
        avatar:''
      },
      graphicUrl: "http://183.237.67.218:3002/captcha?type=sendsms",
      registerRules: {
        updata: [{ required: true, message: "头像", trigger: "blur" }],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "用户名长度为3~8个字符", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6~12个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: verifyPhone, trigger: "blur" }],
        email: [{ required: true, validator: emailRule, trigger: "blur" }]
      },
      rockon: 0,
      flag: false
    };
  },

  methods: {
    changeImgURL() {
      // 图片点击事件
      this.imgURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login" + Date.now(); // 加上1970.1.1到现在的毫秒数
    },
    changeGraphicURL() {
      this.graphicUrl =
        "http://183.237.67.218:3002/captcha?type=sendsms&i=" +
        Math.random() * 100;
    },
    submitForm(formName) {
      // 点击登录的表单验证
      this.$refs[formName].validate(valid => {
        if (this.sizeForm.checked != true) {
          this.$message.warning("请勾选用户协议");
          return;
        }
        if (valid) {
          login({
            phone: this.sizeForm.name,
            password: this.sizeForm.password,
            code: this.sizeForm.code
          }).then(res => {
            //成功回调
            if (res.data.code == 200) {
              this.$message.success("登录成功");
            } else if (res.data.code == 202) {
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
    },

    registerClick() {
      // 确定注册按钮点击事件
      if (this.flag != true) {
        this.$message.warning("请输入手机验证码!");
        return;
      } else {
        registerBtn({
          username: this.registerForm.userName,
          phone: this.registerForm.phone,
          email: this.registerForm.email,
          avatar: this.registerForm.avatar,
          password: this.registerForm.userPassword,
          rcode: this.registerForm.phoneCode
        }).then(res => {
          //成功回调
          window.console.log(res);
          if (res.data.code != 200) {
            this.$message.info(res.data.message);
            this.changeGraphicURL();
          } else if (res.data.code == 200) {
            this.$message.info("注册成功,请登录!");
            this.dialogFormVisible = false;
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      //请求头设置
      // 生成本地预览
      this.imageUrl = URL.createObjectURL(file.raw);
      window.console.log(file);
      // 准备提交的数据
      // window.console.log(res); // 图片的路径
      this.registerForm.avatar = res.data.file_path;
      window.console.log(this.registerForm.avatar);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    phoneCode() {
      if (this.registerForm.graphic.length != 4) {
        this.$message.error("验证码格式错误!");
        this.changeGraphicURL();
        return;
      }
      const phoneRulu = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneRulu.test(this.registerForm.phone)) {
        this.$message.error("手机号码格式错误!");
        this.changeGraphicURL();
        return;
      }
      if (this.rockon === 0) {
        this.rockon = 60;
        let myTime = setInterval(() => {
          this.rockon--;
          if (this.rockon == 0) {
            clearInterval(myTime);
          }
        }, 100);
        // 发送短信
        registerMessage({
          code: this.registerForm.graphic,
          phone: this.registerForm.phone,
          t: Date.now()
        }).then(res => {
          //成功回调
          window.console.log(res);
          if (res.data.code != 200) {
            this.changeGraphicURL();
            this.$message.error(res.data.message);
          } else {
            this.$message.info("短信验证码是:" + res.data.data.captcha);
            this.flag = true;
          }
        });
      }
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
        .el-input__icon {
          line-height: 45px;
        }
      }
      .form-password.el-input {
        height: 43px;
        input.el-input__inner {
          height: 43px;
        }
        .el-input__icon {
          line-height: 43px;
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
          .el-input__icon {
            line-height: 44px;
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
  .form-title {
    .el-dialog__header {
      background: linear-gradient(
        225deg,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1)
      );
      text-align: center;
      height: 53px;
      .el-dialog__title {
        color: #fff;
      }
    }
  }
  .formContent {
    .updata {
      .el-upload.el-upload--text {
        display: block;
        width: 179px;
        height: 179px;
        margin: 0 auto;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .el-form-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      padding-bottom: 24px;
      .el-form-item__content {
        width: 489px;
        .el-form-item {
          width: 489px;
        }
        .el-input__inner {
          width: 489px;
          display: block;
          margin-right: 0px;
        }
      }
    }
    .graphic-box.el-form-item {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .el-input {
          width: 325px;
          .el-input__inner {
            width: 325px;
          }
        }
        .graphic {
          width: 143px;
          height: 40px;

          img {
            width: 143px;
            height: 40px;
            /* 使点击时变成小手 */
            cursor: pointer;
          }
        }
      }
    }
    .phoneCode-box.el-form-item {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .el-input {
          width: 325px;
          .el-input__inner {
            width: 325px;
          }
        }
        .phoneCode {
          width: 143px;
          height: 40px;
        }
      }
    }
  }
}
</style>