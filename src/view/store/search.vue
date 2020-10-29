<template>
  <div>
    <nav-bar title="搜索商品"></nav-bar>
        <div class="serarch-box">
            <form action="/">
                <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
                />
                </form>
        </div>
        <div class="recommend">
            <div class="title-box" >
                <div>最近搜索</div>
                <van-icon name="delete" @click="clear"/>
            </div>
            <span v-for='item in myKeywords' :key='item'>{{item}}</span>
        </div>
        <div class="recommend">
            <div class="title-box" >
                <div>搜索推荐</div>
            </div>
            <span v-for='item in myKeywords' :key='item'>{{item}}</span>
        </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as assetsApi from "../../axios/assets.js";
import * as storeApi from "../../axios/store.js"
export default {
  components: {
    navBar
  },
  data() {
    return {
      value:'',
      myKeywords:["白色", "山炮", "傻叉" // 搜索推荐
],
      keyWordsGoods:['苹果', '香蕉', '鲳鱼']
      
    };
  },
async created() {
   const res = await storeApi.getMyKeywords()
   console.log(res)
   const res2 = await storeApi.getGoodsListByKeyword()
   console.log(res2)
  },
  methods: {
      clear(){
          this.myKeywords = []
      },
    async onSearch(val){
        const res = await storeApi.getGoodsListByKeyword(val)
        this.keyWordsGoods = res.data
    },
    onCancel(){
        this.$toast('取消')
    }
  }
};
</script>
<style lang="less" scope>
.recommend{
    text-align: left;
    padding: 0.1rem 0.2rem;
    font-size: 0.24rem;
    margin-bottom: 1rem;
    .title-box{
        display: flex;
        justify-content: space-between;
    }
    span{
        display: inline-block;
        margin: .5rem 0.2rem;
    }
}
</style>
