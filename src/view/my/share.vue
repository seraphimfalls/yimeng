<template>
  <div>
    <nav-bar title="我要分享"></nav-bar>
    <div class="font28 margin2">我分享的二维码</div>
    <div id="qrcode" class="flex-box-center"></div>
    <div class="flex-box width96">
      <van-field v-model="value" />
      <van-button
        type="info"
        size="small"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >复制</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import QRCode from "qrcodejs2";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      value: ""
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res);
    this.value = res.data.share_url;
    this.qrcode(this.value);
  },
  methods: {
    onCopy(e) {
      this.$toast.success("复制成功");
    },
    onError(e) {
      this.$toast.fail("复制失败");
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: this.value, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    }
  }
};
</script>
<style lang="less" scope>
</style>
