<template>
  <div style="background:#f7f7f7">
    <nav-bar title="我的资产"></nav-bar>
    <div class="property-box">
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont iconemizhongzi marginR2 color1"></span>
          <span class="font600">金种子余额</span>
        </div>
        <span class="text">{{gold_seeds}}</span>
      </div>
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont iconjine marginR2 color2"></span>
          <span class="font600">备用金余额</span>
        </div>
        <span class="text">{{score}}</span>
      </div>
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont icon3 marginR2 color3"></span>
          <span class="font600">现金余额</span>
        </div>
        <span class="text">{{money}}</span>
      </div>
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont icongongzi marginR2 color4"></span>
          <span class="font600">工资（现金）</span>
        </div>
        <span class="text">{{salary}}</span>
      </div>
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont iconjiangbei marginR2 color5"></span>
          <span class="font600">静态奖（备用金）</span>
        </div>
        <span class="text">{{static_bonus}}</span>
      </div>
      <div class="property-content">
        <div class="flex-box">
          <span class="iconfont iconjiangzhang marginR2 color6"></span>
          <span class="font600">见点奖（现金）</span>
        </div>
        <span class="text">{{point_award}}</span>
      </div>
    </div>
    <div class="money-box">
      <div class="textLeft">
        <p class="font600">报单中心补助（现金）</p>
        <span class="text">{{center_subsidy}}</span>
      </div>
      <img src="../../assets/images/property-bg.png" />
    </div>
    <div style="padding-bottom:1rem">
      <div class="link-box" @click="buygold">
        <div class="flex-box">
          <span class="iconfont icontubiaozhizuomoEban marginR2"></span>
          购买金种子
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="cash">
        <div class="flex-box">
          <span class="iconfont iconxianjinquan marginR2"></span>
          现金余额提现
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="transfer">
        <div class="flex-box">
          <span class="iconfont iconzhihuan marginR2"></span>
          备用金互转
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="replacement">
        <div class="flex-box">
          <span class="iconfont iconhuanyihuan marginR2"></span>
          备用金置换
        </div>
        <van-icon name="arrow" />
      </div>
      <!-- <div class="link-box">
        <div class="flex-box" @click="financial">
          <span class="iconfont iconwodelicai marginR2"></span>
          备用金理财
        </div>
        <van-icon name="arrow" />
      </div> -->
      <div class="link-box" @click="moneyList">
        <div class="flex-box">
          <span class="iconfont icondingdangdaizijinliushui marginR2"></span>
          资金流水
        </div>
        <van-icon name="arrow" />
      </div>
      <!-- <div class="link-box" @click="more">
        <div class="flex-box">
          <span class="iconfont icongengduo marginR2"></span>
          更多
        </div>
        <van-icon name="arrow" />
      </div> -->
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import tabBar from "../../components/tabBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar,
    tabBar
  },
  data() {
    return {
      gold_seeds:"",
      salary:"",
      money:"",
      static_bonus:"",
      point_award:"",
      center_subsidy:"",
      score:"",
      can_transfer:""
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    this.gold_seeds = res.data.gold_seeds;
    this.static_bonus = res.data.static_bonus;
    this.score = res.data.score;
    this.salary = res.data.salary;
    this.money = res.data.money;
    this.static_bonus = res.data.static_bonus;
    this.point_award = res.data.point_award;
    this.center_subsidy = res.data.center_subsidy
    this.can_transfer = res.data.can_transfer
    // console.log(res);
  },
  methods: {
    buygold() {
      this.$router.push({ path: "/buyGold" });
    },
    cash() {
      this.$router.push({ path: "/cash" });
    },
    transfer() {
      if(this.can_transfer==0){
        this.$toast.fail("您不能使用备用金互转")
      }else{
         this.$router.push({ path: "/cashTransfer" });
      }
    },
    replacement() {
      this.$router.push({ path: "/cashReplacement" });
    },
    financial() {
      this.$router.push({ path: "/financial" });
    },
    moneyList() {
      this.$router.push({ path: "/moneyList" });
    },
    more() {}
  }
};
</script>
<style lang="less" scope>
.property-box {
  width: 96%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 0.28rem;
  line-height: 2em;
  text-align: left;
}
.property-content {
  width: 49%;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
  margin: 0.2rem 2% 0rem 0;
  border-radius: 0.1rem;
}
.property-content:nth-child(2n) {
  margin-right: 0 !important;
}
.text {
  color: #aeaeae;
  padding-left: 0.7rem;
}
.money-box {
  width: 96%;
  margin: 0.2rem auto;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  font-size: 0.28rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.money-box img {
  width: 2.58rem;
  height: 1.48rem;
}
.link-box .iconfont {
  font-size: 0.36rem;
  color: #59a4fe;
}
.color1 {
  color: #fabc00 !important;
}
.color2 {
  color: #815498 !important;
}
.color3 {
  color: #afce40 !important;
}
.color4 {
  color: #4482bb !important;
}
.color5 {
  color: #7dcfc4 !important;
}
.color6 {
  color: #f2705a !important;
}

.property-content .iconfont {
  font-size: 0.48rem;
}
</style>
