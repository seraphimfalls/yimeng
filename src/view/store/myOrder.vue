<template>
  <div>
    <nav-bar id="reset" title="我的订单"></nav-bar>
    <van-tabs v-model="active"  class="font28">
      <van-tab v-for="tab in tabList" :title="tab.name" :name="tab.id" :key="tab.id">
        <order-list :listType="active"></order-list>
      </van-tab>
    </van-tabs>
 

  
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import orderList from "../../components/orderList.vue";
import * as userApi from "../../axios/user.js";
export default {
  components: {
    navBar,
    orderList
  },
  data() {
    return {
     active: "-99",
      tabList: [
        {
          name: "全部",
          id: "-99"
        },
        {
          name: "待支付",
          id: "0"
        },
        {
          name: "待发货",
          id: "1"
        },
        {
          name: "待收货",
          id: "2"
        },
        {
          name: "已取消",
          id: "3"
        },
        {
          name: "已完成",
          id: "4"
        }
      ]
    };
  },

  methods: {
   
  }
};
</script>
<style lang="less" scope>
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
