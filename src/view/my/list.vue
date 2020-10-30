<template>
  <div>
    <nav-bar title="报单记录"></nav-bar>

    <div class="list-box border-bottom2">
      <span>日期/时间</span>
      <span>报单额度</span>
      <span>累计释放次数</span>
      <span>累计释放</span>
    </div>
    <van-list v-model="loading" loading-text="加载中" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list-box" v-for="item in listData" :key="item.id">
        <span>
          {{item.create_ymd}}
          <br />
          {{item.create_date}}
        </span>
        <span>{{item.total_money}}</span>
        <span>{{item.shifang_count}}</span>
        <span>{{item.score_been_released}}</span>
      </div>
    </van-list>
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
      limit: 10,
      loading: false,
      finished: false
    };
  },
  // async created() {
  //   const res = await mineApi.orderList(this.page, this.limit);
  //   // console.log(res)
  //   this.listData = res.data;
  // },
  methods: {
    async onLoad() {
      let res = await mineApi.orderList(this.page, this.limit);
      
      if (res.data.length < 10) {
        this.finished = true;
      }
      this.page=this.page+1;
      this.listData = this.listData.concat(res.data)
       this.loading = false
    }
  }
};
</script>
<style lang="less" scope>
.list-box span {
  flex: 1;
}
</style>
