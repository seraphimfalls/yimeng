<template>
  <div>
    <nav-bar title="购买理财产品"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont iconjine marginR2 colorfabd02"></span>
        当前备用金余额：
      </div>
      {{blance}}
    </div>
    <div class="link-box">
      <span>投资额度</span>
      <span class="coloraeaeae">{{edu}}</span>
    </div>
    <div class="link-box">
      <span>倍数</span>
      <van-stepper v-model="value" />
    </div>
     <div class="link-box">
      <span>投资周期</span>
      <span class="coloraeaeae">30天</span>
    </div>
     <div class="link-box">
      <span>预计收益（1%）</span>
      <span class="coloraeaeae">20</span>
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field type="number" style="width:78%" v-model="num" placeholder="请输入支付密码" />
    </div>
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认购买支付5000备用金</van-button>
    </div>
    <div class="btn-box">
      <van-button type="warning" @click="confirm">我的理财记录</van-button>
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
      blance: "8800.00",
      value:1,
      edu: "100"
    };
  },

  methods: {}
};
</script>
<style lang="less" scope>
</style>
