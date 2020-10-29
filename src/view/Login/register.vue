<template>
  <div>
    <nav-bar title="注册"></nav-bar>
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo" />
    </div>
    <van-cell-group>
      <van-field
        v-model="mobile"
        type="tel"
        @keyup="inputChange"
        label="手机号："
      />
      <van-field
        v-model="captcha"
        center
        clearable
        autocomplete="new-password"
        label="短信验证码："
        placeholder="请输入短信验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sms"
          :disabled="disabled"
          >{{ btntxt }}</van-button
        >
      </van-field>
      <van-field
        v-model="password"
        type="password"
        autocomplete="new-password"
        label="设置登录密码："
      />
      <van-field
        v-model="pay_password"
        type="password"
        label="设置支付密码："
      />
      <van-field v-model="invitecode" label="邀请人：" />
    </van-cell-group>

    <van-button type="info" @click="register()">立即注册</van-button>
    <div class="width90 font24 line-height2" @click="login()">
      已有账户，前去登录
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      mobile: "",
      password: "",
      captcha: "",
      pay_password: "",
      invitecode: "",
      event: "register",
      disabled: false,
      time: 60,
      btntxt: "发送验证码"
    };
  },
  async created() {
    this.invitecode = this.$route.query.invitecode;
  },
  methods: {
    inputChange() {
      this.mobile = this.mobile.replace(/[^\d]/g, "");
    },
    async sms() {
      if (this.mobile != this.mobile || this.mobile == "") {
        this.$toast("请输入正确的手机号");
        return "";
      }
      const res = await userApi.send(this.mobile, this.event);
    //   console.log(res);
      this.$toast(res.msg);
      this.time = 60;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "秒";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    },
    async register() {
      if (this.password == "") {
        this.$toast.fail("请输入登录密码");
      }
      if (this.pay_password == "") {
        this.$toast.fail("请输入支付密码");
      }
      const res = await userApi.register(
        this.password,
        this.pay_password,
        this.mobile,
        this.invitecode,
        this.captcha
      );
      // console.log(res);
      if (res.code == 1) {
        this.$router.push({ path: "/registerSuccess" });
      } else {
        this.$toast(res.msg);
      }
    },

    login() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="less" scope>
.logo-box {
  width: 2rem;
  height: 2rem;
  margin: 1rem auto 0.5rem auto;
}
.logo {
  width: 100%;
}
.van-field__label {
  width: 120px !important;
  text-align: right;
}
</style>
