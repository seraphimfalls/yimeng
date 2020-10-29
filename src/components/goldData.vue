<template>
  <div>
      <van-list
          v-model="loading"
          loading-text="加载中"
          :offset="offest"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list-data-box" v-for="item in goldData" :key="item.index">
            <div class="textLeft">
              <div>{{ item.remark }}</div>
              <div class="coloraeaeae font24">{{ item.createtime }}</div>
            </div>
            <span>{{ item.money }}</span>
          </div>
        </van-list>
  </div>
</template>

<script>
import * as assetsApi from "../axios/assets.js";
export default {
  name: "goldData",
  data() {
    return {
       page: 1,
      limit: 10,
      offest:10,
      loading: false,
      finished: false,
      goldData:[],
      type:1
    };
  },
  methods: {
     async onLoad() {
      let res = await assetsApi.getList(this.page, this.limit,this.type);
      if (res.data.length < 10) {
        this.finished = true;
      }
      this.page=this.page+1;
      this.goldData = this.goldData.concat(res.data)
       this.loading = false
    }
  }
};
</script>
<style scoped>
</style>
