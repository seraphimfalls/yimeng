<template>
  <div>
    <nav-bar title="我的团队"></nav-bar>
    <div class="num-box">
      <span>直推人数：{{invite_num}}</span>
      <span>团队人数：{{team_num}}</span>
    </div>
    <div class="team-box" v-for="item in teamData" :key="item.id">
      <img src="../../assets/images/avatar.png" class="avatar" />
      <div>
        <div class="flex-box">ID:{{item.id}}</div>
        <div class="flex-box">手机号:{{item.mobile}}</div>
      </div>
      <div>
        <div class="flex-box">注册时间:{{item.createtime}}</div>
        <div class="flex-box">团队人数:{{item.team_num}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      page:1,
      limit:10,
      teamData:[],
      invite_num:"",
      team_num:""
    };
  },
  async created() {
    const res =await mineApi.getMyTeam(this.page,this.limit);
    this.teamData = res.data.childrenList
    this.team_num = res.data.team_num;
    this.invite_num = res.data.invite_num;
  },
  methods: {}
};
</script>
<style lang="less" scope>
.num-box{
  padding:0.2rem;
  background: #f7f7f7;
  box-sizing: border-box;
  line-height: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  margin:0rem auto
}
.team-box {
  width: 96%;
  margin: 0.2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.28rem;
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 0.1rem;
}
</style>
