<template>
  <div>
    <nav-bar title="忘记密码"></nav-bar>
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo" />
    </div>
    <van-cell-group>
      <van-field v-model="mobile" type="tel" @keyup="inputChange" label="手机号：" />
      <van-field
        v-model="sms"
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
          :disabled="disabled"
          @click="getSms()"
        >{{ btntxt }}</van-button>
      </van-field>
      <van-field v-model="password" autocomplete="new-password" type="password" label="设置密码：" />
      <van-field v-model="newpassword" type="password" label="确认设置密码：" />
    </van-cell-group>

    <van-button type="info" @click="save()">保&nbsp;&nbsp;&nbsp;&nbsp;存</van-button>
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
      sms: "",
      newpassword: "",
      event: "resetpwd",
      disabled: false,
      time: 60,
      btntxt: "发送验证码"
    };
  },

  methods: {
    inputChange() {
      this.mobile = this.mobile.replace(/[^\d]/g, "");
    },
    async getSms() {
      if (this.mobile != this.mobile || this.mobile == "") {
        this.$toast("请输入正确的手机号");
        return "";
      }
      const res = await userApi.send(this.mobile, this.event);
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
    async save() {
      const res = await userApi.resetPassword(
        this.password,
        this.mobile,
        this.sms
      );
      this.$toast(res.msg);
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
