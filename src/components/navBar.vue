<template>
  <van-nav-bar :title="title" class="dqjt-nav">
    <van-icon name="arrow-left" slot="left"  @click="goBack" v-show="flag" />
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: String
  },
  name: "navBar",
  data() {
      return{
        flag: false
      }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    if (
      this.$route.path == "/home" || this.$route.path == "/" || this.$route.path == "/store" || this.$route.path=="/property"
     
    ) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
};
</script>

<style scoped>
.dqjt-nav{
    background: #59a4fe;
}
.van-nav-bar__title{
     color:#fff !important;
}
.van-icon-arrow-left{
    color:#fff !important;
}
</style>
