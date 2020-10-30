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
            <span v-for='item in keyWordsGoods' :key='item'  @click='searBbtn(item)'>{{item}}</span>
        </div>
      <div class="bottom-box">
      <div class="list-box" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
        <div class="product-img">
          <img :src="item.image" />
        </div>
        <div style="width:80%">
          <div class="van-multi-ellipsis--l2 textLeft">{{ item.title }}</div>
          <div class="flex-box-between textLeft">
            <span class="colorff4b4b">折扣价：{{ item.price }}</span>
            <van-button color="#59a4fe" size="small">购买</van-button>
          </div>
        </div>
      </div>
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
      keyWordsGoods:['苹果', '香蕉', '鲳鱼'],
      goodslist:[]
    };
  },
async created() {
   const res = await storeApi.getMyKeywords()
   const res2 = await storeApi.getGoodsListByKeyword()
  },
  methods: {
    searBbtn(val){
      this.onSearch(val)
    },
    getDetail(id) {
      let info = {
        id: id
      }
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({path: "/goodsDetail"})
    },
      clear(){
          this.myKeywords = []
      },
    async onSearch(val){
        const res = await storeApi.getGoodsListByKeyword(val)
        if(res.code == 1 && res.data == 0){
          this.$toast('暂无商品')
        }else if(res.code == 1 && res.data != 0){
          this.goodslist = res.data
        }else{
          this.$toast('搜索失败，请重试')
        }
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

.banner-box {
  position: relative;
}
.news-box {
  position: absolute;
  width: 7rem;
  left: 50%;
  bottom: -0.1rem;
  margin-left: -3.5rem;
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  line-height: 2em;
}
.news-icon {
  color: #59a4fe;
  font-size: 0.36rem;
  margin-right: 0.2rem;
}
.hospital-fee-box {
  width: 90%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.1rem;
  border-bottom: 0.01rem solid #f7f7f7;
}
.hospital-fee-box .iconfont {
  color: #59a4fe;
  font-size: 0.48rem;
  margin-right: 0.1rem;
}
.lbimg {
  width: 100%;
  height: 4rem;
}
.notice-box {
  font-size: 0.28rem;
  line-height: 20px;
  text-align: left;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.four-icon-box {
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
}
.four-icon {
  width: 49%;
  height: 1.45rem;
  display: flex;
  align-items: center;
  border-radius: 0.1rem;
  margin: 0.2rem 2% 0 0;
  padding: 0.2rem;
  box-sizing: border-box;
}
.four-icon1 {
  background: #effae9;
}
.four-icon2 {
  background: #e2f1fa;
}
.four-icon3 {
  background: #f3f3e2;
}
.four-icon4 {
  background: #fff3ed;
}
.four-icon:nth-child(2n) {
  margin-right: 0 !important;
}
.icon-box {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  font-size: 0.6rem;
  margin-right: 0.2rem;
}
.icon-box1 {
  background: #6cc49f;
}
.icon-box2 {
  background: #69b6e5;
}
.icon-box3 {
  background: #ffd86d;
}
.icon-box4 {
  background: #ff906d;
}
.icon-text {
  text-align: left;
  line-height: 1.8em;
  font-size: 0.26rem;
}
.five-icon-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem auto;
}
.five-icon {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 40%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
}
.five-icon .iconfont {
  font-size: 0.4rem;
}
.five-icon-text {
  width: 100%;
  margin: 0.1rem auto;
  font-size: 0.28rem;
}
.list-box {
  width: 90%;
  margin: 0.2rem auto;
  display: flex;
  font-size: 0.24rem;
  line-height: 1.8em;
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 0.1rem;
}
.product-img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
}
.product-img img {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
}
.bottom-box {
  padding-bottom: 0.98rem;
}
.sign-img {
  width: 7.5rem;
  height: 2.1rem;
  margin: 0.2rem auto;
}
.hospital-fee-content-box {
  width: 94%;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0.2rem auto;
  font-size: 0.28rem;
}
.hospital-fee-content {
  width: 3rem;
  flex-shrink: 0;
  margin-right: 0.2rem;
}
.hospital-fee-content img {
  width: 100%;
  height: 2.4rem;
}
.title {
  font-size: 0.36rem;
  font-weight: 600;
}

</style>
