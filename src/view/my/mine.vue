<template>
  <div class="bg">
    <div class="mine-top-box">
      <div class="mine-content">
        <div class="flex-box">
          <img src="../../assets/images/logo.png" class="avatar" />
          <div class="textLeft">
            <p>id:{{id}}</p>
            手机号：{{mobile}}
          </div>
        </div>
        <van-tag mark type="warning">{{level_name}}</van-tag>
      </div>
    </div>
    <div style="padding-bottom:1rem">
      <div class="link-box" @click="list">
        <div class="flex-box">
          <span class="iconfont iconjilu marginR2"></span>
          报单记录
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="share">
        <div class="flex-box">
          <span class="iconfont iconfenxiang1 marginR2"></span>
          我要分享
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="team">
        <div class="flex-box">
          <span class="iconfont icontuandui marginR2"></span>
          我的团队
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" v-if="is_center==1">
        <div class="flex-box">
          <span class="iconfont iconshenqing"></span>
          申请报单中心
        </div>您已经成为报单中心
      </div>
      <div class="link-box" v-if="is_center==2">
        <div class="flex-box">
          <span class="iconfont iconshenqing"></span>
          申请报单中心
        </div>
        <div class="flex-box">
          团队人数：{{teamNum}}人
          <span style="margin-left:0.2rem">申请中</span>
        </div>
      </div>
      <div class="link-box" v-else-if="is_center==0" @click="apply">
        <div class="flex-box">
          <span class="iconfont iconshenqing"></span>
          申请报单中心
        </div>
        <div class="flex-box">
          团队人数：{{teamNum}}人
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="link-box" @click="safe">
        <div class="flex-box">
          <span class="iconfont iconanquan marginR2"></span>
          账户安全
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="withdrawal">
        <div class="flex-box">
          <span class="iconfont icontixian" style="margin-right:0.1rem"></span>
          提现地址
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="service">
        <div class="flex-box">
          <span class="iconfont iconkefu marginR2"></span>
          联系客服
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="btn-box">
        <van-button type="info" size="small" @click="logout">退出</van-button>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "../../components/tabBar.vue";
import * as mineApi from "../../axios/mine.js";
import { Dialog } from "vant";
export default {
  components: {
    tabBar,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      id: "",
      mobile: "",
      teamNum: "",
      level_name: "",
      is_center: "",
      applyCon: "",
      msg: ""
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res);
    this.id = res.data.id;
    this.mobile = res.data.mobile;
    this.level_name = res.data.level_name;
    this.teamNum = res.data.active_team_num;
    this.is_center = res.data.is_center;
  },
  methods: {
    list() {
      this.$router.push({ path: "/list" });
    },
    share() {
      this.$router.push({ path: "/share" });
    },
    team() {
      this.$router.push({ path: "/team" });
    },
    async apply() {
      if(this.teamNum < 50){
        this.msg =
            "伞下有效报单会员数量不足50人" +
            "<p>团队人数达到50人，可以申请报单中心。成为报单中心后，可以享受团队新增业绩1%的奖励</p>";
         Dialog.alert({
            title: "申请报单中心",
            message: this.msg
          }).then(() => {
            // on close
          });
      }else{
         this.msg =
          "您的团队人数已达标" +
          "<p>团队人数达到50人，可以申请报单中心。成为报单中心后，可以享受团队新增业绩1%的奖励</p>";
        Dialog.confirm({
          title: "申请报单中心",
          message: this.msg
        })
          .then(() => {
               this.applyS()
          })
          .catch(() => {
            // on cancel
          });
      }
    },
     async applyS(){
        const res = await mineApi.applyService();
        // console.log(res)
        if(res.code==0){
          this.$toast.fail(res.msg)
        }else{
          this.$toast.success(res.msg)
        }
         window.location.reload();
     },
    withdrawal() {
      this.$router.push({ path: "/withdrawal" });
    },
    safe() {
      this.$router.push({ path: "/safe" });
    },
    service() {
      this.$router.push({ path: "/service" });
    },
    async logout() {
      const res = await mineApi.logout();
      localStorage.removeItem("token");
      this.$toast.success(res.msg);
      if (res.code == 1) {
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.$router.push({ path: "/login" });
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less" scope>
body,html{
  height: 100%;
}
.bg{
  width:100%;
  height: 100%;
  background: #f7f7f7;
}
.mine-top-box {
  width: 100%;
  height: 3.24rem;
  background: url(../../assets/images/mine-bg.png) no-repeat center center;
}
.mine-content {
  padding: 0.8rem 0.2rem 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  color: #fff;
  box-sizing: border-box;
}
.avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.link-box .iconfont {
  font-size: 0.36rem;
  color: #59a4fe;
}
</style>
