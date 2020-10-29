<template>
  <div>
    <router-view />

    <van-tabbar route class="dqjt-tabbar"  active-color="#fff"
  inactive-color="#9cc9ff">
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/store" icon="shop-o">
        商城
      </van-tabbar-item>
      <van-tabbar-item replace to="/property" icon="paid">
        资产
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>

.dqjt-tabbar{
    background: #59a4fe;
}

</style>
