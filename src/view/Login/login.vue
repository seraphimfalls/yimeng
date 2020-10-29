<template>
  <div class="loginbg">
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo" />
    </div>
    <div class="input-box">
      <div class="flex-box font28 border-bottom">
        <span class="iconfont iconshouji"></span>
        <van-field v-model="account" autocomplete="new-password" placeholder="请输入手机号" />
      </div>
      <div class="flex-box font28 border-bottom">
        <span class="iconfont iconmima"></span>
        <van-field v-model="password" type="password" autocomplete="new-password" placeholder="请输入密码" />
      </div>
      <!-- <van-field v-model="account" left-icon="phone-circle" autocomplete="new-password" placeholder="请输入手机号" />
      <van-field v-model="password" type="password" left-icon="lock" autocomplete="new-password" placeholder="请输入密码" /> -->
    </div>
    <div class="width90 textRight colorfff font28" @click="forgetPassword()">忘记密码？</div>
    <van-button type="info" @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;录</van-button>
    <div class="width90 font24 colorfff line-height2" @click="register()">还没账户？立即注册</div>
    <div class="width90 font24 colorfff line-height2" @click="download()">立即下载APP</div>
  </div>
</template>
<script>
// import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
export default {
  components: {
    // navBar
  },
  data() {
    return {
      account: "",
      password: ""
    };
  },

  methods: {
    download() {
      window.location.href = "";
    },
    async login() {
      const res = await userApi.login(this.account, this.password);
          // console.log(res);
      if (res.code == 1) {
        this.$toast(res.msg);
        localStorage.removeItem("yimeng_token");
        localStorage.setItem("yimeng_token", res.data.token);
        this.$router.push({
          path: "/home"
        });
      } else {
        this.$toast(res.msg);
      }
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    forgetPassword() {
      this.$router.push({ path: "/forgetPassword" });
    }
  }
};
</script>
<style lang="less" scope>
.logo-box {
  width: 2rem;
  height: 2.01rem;
  margin: 1rem auto 0.5rem auto;
}
.logo {
  width: 100%;
  border-radius: 0.1rem;
}
.loginbg {
  width: 100%;
  height: 13.34rem;
  overflow: hidden;
   background: url(../../assets/images/loginbg.jpg) no-repeat center top;
  background-size: 100%;
}
.input-box {
  width:90%;
  margin:3.5rem auto 0.2rem auto;
}
.input-box .iconfont{
  font-size: 0.42rem;
  color:#59a4fe
}
</style>
