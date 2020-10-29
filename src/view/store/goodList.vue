<template>
  <div class="body">
    <nav-bar title="商城列表"></nav-bar>
    <van-tabs v-model="activeName" @change="changeid">
      <van-tab class="goods-box" title="全部">
        <div class="goods-list" v-for="item in goryListId" :key="item.id" :title="item.name" :index="item.id" @click="getDetail(item.id)">
          <div class="product-img">
            <img :src="item.image"/>
          </div>
          <div class="d_box">
            <div class="goods_title">{{item.title}}</div>
            <div class="goods_price">售价：{{item.price}}</div>
          </div>
          <van-button class="btn" color="#59a4fe"  size="small">购买</van-button>
        </div>
      </van-tab>
      <van-tab class="goods-box" v-for="(item, i) in goryList" :title="item.name" :name="item.id" :key="i">
        <div class="goods-list" v-for="item in goryListId" :key="item.id" :title="item.name" :index="item.id" @click="getDetail(item.id)">
          <div class="product-img">
            <img :src="item.image"/>
          </div>
          <div class="d_box">
            <div class="goods_title">{{item.title}}</div>
            <div class="goods_price">售价：{{item.price}}</div>
          </div>
          <van-button class="btn" color="#59a4fe"  size="small">购买</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navBar from "../../components/navBar.vue";
import tabBar from "../../components/tabBar.vue";
import * as userApi from "../../axios/user.js";
import * as homeApi from "../../axios/home.js"
import * as storeApi from "../../axios/store.js"
export default {
  components: {
    navBar,
    tabBar
  },
  data() {
    return {
      activeName: "",
      goryList: [],
      goryListId:[],
      index:'',
      listId: ''
    }
  },
  methods: {
    getDetail(id) {
      let info = {
        id: id
      }
      console.log(info)
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({path: "/goodsDetail"})
    },
    async changeid(changeid){
        this.listId = changeid
        const res = await storeApi.getGoodsListByCategoryId(this.listId)
        this.goryListId = res.data
    },
    
  },
  async created () {
      const res = await storeApi.getGoodsCategoryList()
      this.goryList = res.data  
      this.activeName = res.data.id
      const res2 = await storeApi.getGoodsListByCategoryId(this.listId)
      this.goryListId = res2.data
      // console.log(this.goryListId)
  },
  
}
</script>

<style lang="less" scoped>
.btn{
  border-radius:0.2rem;
  margin-top: .5rem;
}
.lbimg {
  width: 100%;
  height: 4rem;
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
  font-size: 0.48rem;
}

.five-icon-text {
  width: 100%;
  margin: 0.1rem auto;
  font-size: 0.28rem;
}

.list-box {
  width: 90% !important;
  margin: 0.3rem auto !important;
  display: flex !important;
  font-size: 0.24rem !important;
  line-height: 1.8em !important;
  // border: 1px solid #B0C4DE;
  padding: 0.2rem 0.4rem !important;
  background: rgba(245,245,245,0.4) !important;
  border-radius: .2rem !important;
}
.sign-img {
  width: 7.5rem;
  height: 2.1rem;
  margin: 0.2rem auto;
}
.body{
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.goods-box{
  width: 100%;
  height: 100%;
  .goods-list{ 
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    margin: 0.1rem 0.2rem;
    padding-bottom: .1rem;
    border-bottom: 1px solid rgba(245,245,245,0.4);
    .product-img{
      width: 2rem;
      height: 2rem;
      padding-right: 0.1rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
    }
    .d_box{
      text-align: left;
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding-bottom: .3rem;
      .goods_title{
        font-size: 0.3rem;
      }
      .goods_price{
        color: rgb(255,0,0,);
      }
    }
  }
}
</style>