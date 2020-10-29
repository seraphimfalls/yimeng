<template>
  <div>
    <nav-bar title="报单记录"></nav-bar>
    <div class="list-box border-bottom2">
      <span>日期/时间</span>
      <span>报单额度</span>
      <span>累计释放次数</span>
      <span>累计释放</span>
    </div>
    <div class="list-box" v-for="item in listData" :key="item.id">
      <span>{{item.create_ymd}}<br>{{item.create_date}}</span>
      <span>{{item.total_money}}</span>
      <span>{{item.shifang_count}}</span>
      <span>{{item.score_been_released}}</span>
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
      listData: [],
      page: 1,
      limit:10
    };
  },
  async created() {
    const res = await mineApi.orderList(this.page, this.limit);
    // console.log(res)
    this.listData = res.data;
  },
  methods: {}
};
</script>
<style lang="less" scope>
.list-box span {
  flex: 1;
}
</style>
