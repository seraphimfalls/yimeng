<template>
  <div>
    <nav-bar title="现金余额提现"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont icon3 marginR2 colorfabd02"></span>
        当前现金余额：
      </div>
      {{blance}}元
    </div>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次提现</span>
      <van-field type="number" style="width:60%" v-model="num" placeholder="请输入提现数量" />元
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>提现收款账号</span>
      <van-dropdown-menu>
        <van-dropdown-item @change="withdrawlConfig" v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="width96 font28 margin2 flex-box-between">
      <span>支付密码</span>
      <van-field type="password" style="width:78%" v-model="password" placeholder="请输入支付密码" />
    </div>
 <van-panel title="温馨提示：" class="font28 textLeft line-height2 width90">
      <div>
        ①单笔提现最小金额{{tixian_min_amount}}起，100的整数倍递增
        <br />②每天可以提现{{tixian_times}}次
        <br />③单笔提现手续费{{tixian_fei}}
      </div>
    </van-panel>
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认购买</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      blance: "",
      num:"",
       value1: 0,
      option1: [],
      tixian_min_amount:"",
      tixian_times:"",
      tixian_fei:"",
      password:"",
      receiving_account:""
    };
  },
async created() {
    const res = await mineApi.getAccount();
    this.blance = res.data.money;
    let Wres = await assetsApi.getWithdrawAddressInfo();
    const allArr = [{text: "请选择提现账号" , value: 0 }];
    if(Wres.code == 0){
      this.$toast(Wres.msg)
    }else{
      this.option1 = [...allArr,...Wres.data];
    }
    const Cres = await assetsApi.getWithdrawConfig();
    this.tixian_times = Cres.data.tixian_times;
    this.tixian_min_amount = Cres.data.tixian_min_amount;
    this.tixian_fei = Cres.data.tixian_fei;
  },
  methods: {
    withdrawlConfig(){
       let List = this.option1.find(ele=>ele.value === this.value1);
      this.receiving_account = List.text
    },
    async confirm(){
      if(parseInt(this.num)<parseInt(this.tixian_min_amount)){
        this.$toast.fail("单笔提现最小金额" + this.tixian_min_amount +"起")
      }
      if(Number(this.num) % 100 != 0){
        this.$toast.fail("提现金额必须是100的倍数");
      }
      const res = await assetsApi.withdraw(this.num,this.receiving_account,this.value1,this.password)
      if(res.code==1){
        this.$toast.success(res.msg);
        this.$router.push({path:"/property"})
      }else{
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>
