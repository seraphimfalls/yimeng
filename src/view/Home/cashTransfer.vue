<template>
  <div>
    <nav-bar title="备用金互转"></nav-bar>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span style="width:35%">出售备用金</span>
      <van-field type="number" v-model="number" placeholder="请输入置换现金额度" />个
    </div>
    <div class="width96 font28 margin2 textRight coloraeaeae">
      当前备用金余额{{blance}}个
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span style="width:35%">出售对象</span>
      <van-field type="number" v-model="mobile" placeholder="请输入对方账号" />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span style="width:35%">支付密码</span>
      <van-field type="password" v-model="password" placeholder="请输入支付密码" />
    </div>
    <div class="flex-box-center margin5">
      <van-button type="info" @click="confirm">确认出售</van-button>
    </div>
    <div class="flex-box-center margin5">
      <van-button type="warning" @click="list">出售记录</van-button>
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
      blance:'',
      number:"",
      mobile:'',
      password:""
    };
  },
async created() {
    const res = await mineApi.getAccount();
    this.blance = res.data.score;
    // console.log(res);
  },
  methods: {
    async confirm(){
      if(parseFloat(this.blance)<parseFloat(this.number)){
        this.$toast.fail("备用金不足")
      }else{
        const res = await assetsApi.transfer(this.number,this.mobile,this.password)
        if(res.code==1){
          this.$toast.success(res.msg)
          this.$router.push({path:"/property"})
        }else{
          this.$toast.fail(res.msg)
        }
      }
    },
    list(){
       this.$router.push({path:"/moneyList",query:{active:"2"}})
    }
  }
};
</script>
<style lang="less" scope>
</style>
