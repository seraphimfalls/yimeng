<template>
  <div>
    <nav-bar title="设置银行卡账户"></nav-bar>
   <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>所属银行</span>
      <van-field type="text" style="width:78%" v-model="bank_name" placeholder="请输入银行名称" />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>持卡人姓名</span>
      <van-field type="text" style="width:78%" v-model="cardholder" placeholder="请输入持卡人姓名" />
    </div>
     <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>银行卡号</span>
      <van-field type="number" style="width:78%" v-model="card_number" placeholder="请输入银行卡号" />
    </div>
    <div class="btn-box">
      <van-button type="info" @click="save">保存设置</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
import * as mineApi from "../../axios/mine.js"
export default {
  components: {
    navBar
  },
  data() {
    return {
     type: 3,
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
     if(res.data.card_number){
       this.card_number = res.data.card_number;
       this.bank_name = res.data.bank_name;
       this.cardholder = res.data.cardholder;
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
