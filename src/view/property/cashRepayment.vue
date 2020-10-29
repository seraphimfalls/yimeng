<template>
  <div>
    <nav-bar title="还款"></nav-bar>
    <div class="flex-box-center font36 margin2 font600">
      <span class="iconfont iconyoushuangxiexian color59aefe"></span>
      平台收款账号
      <span class="iconfont iconzuoshuangxiexian color59aefe"></span>
    </div>
    <van-grid :border="false" :column-num="2" :gutter="10" class="font28 margin2">
      <van-grid-item>
        <van-image :src="weixin_image" />
        <p>微信</p>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="alipay_image" />
        <p>支付宝</p>
      </van-grid-item>
    </van-grid>
    <div class="width90 font28 margin2 flex-box-between border-bottom2">
      <span>本次还款</span>
      {{real_amount}}元
    </div>
    <div class="width90 font28 margin2 flex-box-between border-bottom2">
      <span>释放备用金</span>
      {{score}}个
    </div>
    <div class="width90 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field type="password" style="width:78%" v-model="payPassWord" placeholder="请输入支付密码" />
    </div>
    <div class="flex-box-center font36 margin2 font600">
      <span class="iconfont iconyoushuangxiexian color59aefe"></span>
      上传支付凭证
      <span class="iconfont iconzuoshuangxiexian color59aefe"></span>
    </div>
    <van-uploader
      :after-read="afterRead"
      preview-size="300"
      v-model="fileList"
      multiple
      :max-count="1"
    />
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认还款</van-button>
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
      real_amount: "",
      score: "",
      payPassWord: "",
      fileList: [],
      alipay_image:"",
      weixin_image:"",
      id: "",
      image:"",
    };
  },
  async created() {
    const res = await assetsApi.getPayConfig();
  this.alipay_image = res.data.alipay_image;
  this.weixin_image = res.data.weixin_image;
    this.id = this.$route.query.id;
    const Sres = await assetsApi.getSubstitutionInfo(this.id);
    console.log(Sres);
    this.real_amount = Sres.data.real_amount
    this.score = Sres.data.score
  },
  methods: {
    async afterRead(file) {
       const res = await mineApi.upload(file.file);
        //  console.log(res);
      this.image = res.data.url;
    },
    async confirm() {
      const res = await assetsApi.repaySubstitution(this.id,this.image,this.payPassWord)
      if(res.code==1){
        this.$toast.success(res.msg)
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
