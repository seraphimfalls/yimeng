<template>
  <div>
    <nav-bar title="资金流水"></nav-bar>
    <van-tabs v-model="activeName" @click="onClick">
      <van-tab title="金种子" name="1">
        <gold-data></gold-data>
      </van-tab>
      <van-tab title="备用金" name="2">
        <bei-data></bei-data>
      </van-tab>
      <van-tab title="现金账户" name="3">
        <cash-data></cash-data>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import goldData from "../../components/goldData.vue";
import beiData from "../../components/beiData.vue";
import cashData from "../../components/cashData.vue";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar,
    goldData,
    beiData,
    cashData
  },
  data() {
    return {
      activeName: "1"
    };
  },
  async created() {
    if (this.$route.query.active) {
      this.activeName = this.$route.query.active;
    }
  },
  methods: {
    onClick(name) {}
  }
};
</script>
<style lang="less" scope>
</style>
