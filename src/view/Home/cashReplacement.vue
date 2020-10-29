<template>
  <div>
    <nav-bar title="备用金置换"></nav-bar>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span style="width:35%" class="textLeft">置换现金</span>
      <van-field type="number" @keyup="inputChange" v-model="real_amount" placeholder="请输入置换现金额度" />元
    </div>
    <div class="width96 font28 margin2 textRight coloraeaeae">当前备用金金额{{blance}}元</div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span style="width:35%" class="textLeft">使用备用金</span>
      <span>{{num}}个</span>
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span style="width:35%">支付密码</span>
      <van-field type="password" v-model="password" placeholder="请输入支付密码" />
    </div>
    <van-panel title="置换说明：" class="font28 textLeft line-height2 width90">
      <div>
        1、备用金可以{{score_rate}}比1的比例置换成现金（即30备用金可置换成
        10元现金）
        <br />2、抵扣的备用金为冻结状态，用户需要在{{substitution_limit_days}}日后必须向平台充
        置换的现金来释放因置换被冻结的备用金
        <br />3、逾期不偿还将停止备用金释放，且不能再进行第二次的置
        换，直到偿还后才恢复正常
      </div>
    </van-panel>
    <div class="flex-box-center margin5">
      <van-button type="info" @click="confirm">确认置换</van-button>
    </div>
    <div class="flex-box-center margin5">
      <van-button type="warning" @click="list">备用金置换记录</van-button>
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
      num: "",
      real_amount:"",
      password: "",
      blance: "",
      score_rate:"",
      substitution_limit_days:""
    };
  },
async created() {
    const res = await mineApi.getAccount();
    this.blance = res.data.score;
    const Sres = await assetsApi.getSubstitutionConfig();
    this.score_rate = Sres.data.score_rate;
    this.substitution_limit_days = Sres.data.substitution_limit_days;
    // console.log(res);
  },
  methods: {
    inputChange(){
      this.num = parseFloat(Number(this.real_amount) *Number(this.score_rate))
    },
    async confirm(){
      const res = await assetsApi.substitution(this.real_amount,this.password)
      if(res.code==1){
        this.$toast.success(res.msg)
        this.$router.push({path:"/property"})
      }else{
        this.$toast.fail(res.msg)
      }
    },
    list(){
      this.$router.push({path:"/cashReplacementList"})
    }
  }
};
</script>
<style lang="less" scope>
</style>
