<template>
  <div>
    <nav-bar title="提现地址"></nav-bar>
    <div class="link-box border-bottom2">
      <span>支付宝</span>
      <div class="flex-box" @click="alipay">
        <span>{{alipayInfo}}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="link-box border-bottom2" @click="wechat">
      <span>微信</span>
      <div class="flex-box">
        <span>{{wechatInfo}}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="link-box border-bottom2" @click="bank">
      <span>银行卡</span>
      <div class="flex-box">
        <span>{{bankInfo}}</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      alipayInfo: "请设置支付宝信息",
      wechatInfo: "请设置微信信息",
      bankInfo: "请设置银行卡账号"
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res);
    if (
      res.data.alipay_account == "" ||
      res.data.alipay_account == null ||
      res.data.alipay_account == undefined
    ) {
      this.wechatInfo = "请设置支付宝信息";
    } else {
      this.alipayInfo =
        res.data.alipay_account + "(" + res.data.alipay_real_name + ")";
    }

    if (
      res.data.wx_account == "" ||
      res.data.wx_account == null ||
      res.data.wx_account == undefined
    ) {
      this.wechatInfo = "请设置微信信息";
    } else {
      this.wechatInfo = res.data.wx_account;
    }
    if(res.data.card_number == ""||res.data.card_number ==null||res.data.card_number==undefined){
      this.bankInfo = "请设置银行卡信息";
    }else{
       this.bankInfo = "(" + res.data.bank_name + ")" + res.data.card_number +"(" + res.data.cardholder +")";
    }
  },
  methods: {
    alipay() {
      this.$router.push({ path: "/alipay" });
    },
    wechat() {
      this.$router.push({ path: "/wechat" });
    },
    bank() {
      this.$router.push({ path: "/bank" });
    }
  }
};
</script>
<style lang="less" scope>
</style>
