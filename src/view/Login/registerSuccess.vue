<template>
  <div>
    <nav-bar title="注册成功"></nav-bar>
    <div class="width90 font600" style="margin-top:2rem;">
      <van-icon name="success" />
      <div class="font36">恭喜您，注册成功！</div>
    </div>
    <van-button type="info" @click="back()">返回登录页</van-button>
    <van-button type="danger" @click="download()">下载APP</van-button>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue"
export default {
  components: {
    navBar
  },
  data() {
    return {};
  },

  methods: {
      back(){
          this.$router.push({path:'/login'})
      },
      download(){
          window.location.href = ''; 
      }
  }
};
</script>
<style lang="less" scope></style>
