<template>
  <div>
    <nav-bar title="会员报单"></nav-bar>
    <div class="money-box">
      <div class="money-content">
        <van-icon name="flower-o" />
        <div>
          <div>金种子余额</div>
          <div>{{gold_seeds}}</div>
        </div>
      </div>
      <div class="money-content bgfffaf7">
        <van-icon name="paid" class="coloree9c5b" />
        <div>
          <div>备用金余额</div>
          <div>{{score}}</div>
        </div>
      </div>
    </div>
    <div class="width96">
      <div class="width96 font28 margin2 flex-box-between border-bottom2 textLeft">
        <span style="width:35%">选择报单类型</span>
        <span class="corloraeaeae">{{order_price}}元（财富级）</span>
      </div>
      <div class="width96 font28 margin2 flex-box-between border-bottom2 textLeft">
        <span style="width:35%">使用金种子</span>
        <span class="corloraeaeae">{{order_price}}个</span>
      </div>
      <div class="width96 font28 margin2 flex-box-between border-bottom2 textLeft">
        <span style="width:35%">使用备用金</span>
        <van-field type="number" v-model="num" :placeholder="`请输入使用个数（最多可用 ${order_score}）个`" />
      </div>
      <div class="width96 font28 margin2 flex-box-between border-bottom2 textLeft">
        <span style="width:35%">支付密码</span>
        <van-field type="password" v-model="password" placeholder="请输入支付密码" />
      </div>
    </div>
    <van-cell class="textLeft font28" title="报单说明：" size="large" :label="`报单${order_price}最多可用${order_score}个备用金`" />
     <div class="btn-box">
       <van-button type="info" @click="confirm">确认购买</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as assetsApi from "../../axios/assets.js";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      num: "",
      password: "",
      order_price:"",
      gold_seeds:"",
      score:"",
      order_score:""
    };
  },
async created(){
  const res = await assetsApi.getOrderConfig();
  this.order_price = res.data.order_price;
  this.order_score = res.data.order_score;
  const infoRes = await mineApi.getAccount();
  this.score = infoRes.data.score
  this.gold_seeds = infoRes.data.gold_seeds
  // console.log(res)
},
  methods: {
    async confirm(){
      const res = await assetsApi.applyOrder(this.order_price,this.num,this.password);
      if(res.code==1){
        this.$toast.success(res.msg)
        this.$router.push({path:"/list"})
      }else{
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>
<style lang="less" scope>
.money-box {
  width: 94%;
  margin: 0.2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.money-content {
  flex: 1;
  margin-right: 2%;
  background: #eff6fe;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  text-align: left;
  color: #333;
}
.money-content:last-child {
  margin-right: 0 !important;
}
.money-content /deep/ .van-icon {
  font-size: 0.6rem;
  color: #59a4fe;
  margin-right: 0.1rem;
}
.bgfffaf7 {
  background: #fdf2eb !important;
}
.coloree9c5b {
  color: #ee9c5b !important;
}
</style>
