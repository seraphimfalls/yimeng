<template>
  <div>
    <nav-bar title="联系客服"></nav-bar>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>客服微信号：</span>
      <van-field v-model="value" style="width:70%" />
    </div>
    <div class="btn-box">
      <van-button
        type="info"
        size="small"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >复制客服微信号</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      value:"客服001"
    };
  },

  methods: {
      onCopy(e) {
      this.$toast.success('复制成功');
    },
    onError(e) {
      this.$toast.fail('复制失败');
    },
  }
};
</script>
<style lang="less" scope>
</style>
