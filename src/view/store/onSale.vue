<template>
  <div>
    <nav-bar id="reset" title="特卖活动"></nav-bar>
    <van-tabs v-model="activeName" @click="onClick" class="font28">
      <van-tab v-for="tab in tabList" :title="tab.name" :name="tab.id" :key="tab.id">

        <on-saling :listType="activeName"></on-saling>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import onSaling from "../../components/onSaling.vue";
import * as storeApi from "../../axios/store.js";
export default {
  components: {
    navBar,
    onSaling
  },
  data() {
    return {
      activeName: "1",
      tabList: []
    };
  },
async created() {
  const res = await storeApi.getActivityList();
   this.tabList = res.data
},
  methods: {
    onClick(name, title) {}
  }
};
</script>
<style lang="less" scope>
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
