<template>
  <div>
    <nav-bar title="设置支付宝账户"></nav-bar>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>真实姓名</span>
      <van-field
        type="text"
        style="width:78%"
        v-model="alipay_account"
        placeholder="请输入支付宝账户绑定人的真实姓名"
      />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付宝账户</span>
      <van-field type="text" style="width:78%" v-model="alipay_real_name" placeholder="请输入支付宝账户" />
    </div>
    <div class="btn-box">
      <van-button type="info" @click="save">保存设置</van-button>
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
      type: 1,
      alipay_account: "",
      alipay_real_name: "",
      wx_account:"",
      bank_name: "",
      cardholder: "",
      card_number: ""
    };
  },
  async created() {
     const res = await mineApi.getAccount();
     if(res.data.alipay_account){
       this.alipay_account = res.data.alipay_account;
       this.alipay_real_name = res.data.alipay_real_name;
     }
  },
  methods: {
    async save() {
      const res = await mineApi.modifyWithdrawInfo(this.type,this.alipay_account,this.alipay_real_name,this.wx_account,this.bank_name,this.cardholder,this.card_number)
      if(res.code==0){
        this.$toast.fail(res.msg)
      }else{
        this.$toast.success(res.msg);
        this.$router.push({path:"/withdrawal"})
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>
