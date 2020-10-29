<template>
  <div>
    <nav-bar title="购买金种子"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont iconemizhongzi marginR2 colorfabd02"></span>
        当前金种子余额：
      </div>
      {{blance}}
    </div>
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
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次购买</span>
      <van-field type="number" style="width:60%" v-model="money" placeholder="请输入购买数量" />金种子
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field type="password" style="width:78%" v-model="payPassWord" placeholder="请输入支付密码" />
    </div>
    <div class="flex-box-center font36 margin2 font600">
      <span class="iconfont iconyoushuangxiexian color59aefe"></span>
      上传支付凭证
      <span class="iconfont iconzuoshuangxiexian color59aefe"></span>
    </div>
    <van-uploader  :after-read="afterRead" preview-size="300" v-model="fileList" multiple :max-count="1" />
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
      blance: "8800.00",
       fileList: [],
       image:"",
       money:"",
      payPassWord:"",
      alipay_image:"",
      weixin_image:""

    };
  },
async created() {
  const res = await assetsApi.getPayConfig();
  this.alipay_image = res.data.alipay_image;
  this.weixin_image = res.data.weixin_image;
  // console.log(res)
},
  methods: {
    async afterRead(file) {
       const res = await mineApi.upload(file.file);
         console.log(res);
      this.image = res.data.url;
    },
    async confirm(){
      const res = await assetsApi.recharge(this.money,this.payPassWord,this.image);
      if(res.code == 0){
        this.$toast.fail(res.msg)
      }else{
        this.$toast.success(res.msg);
        this.$router.push({path:'/property'})
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>
