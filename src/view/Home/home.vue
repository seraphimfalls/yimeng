<template>
  <div>
    <div class="banner-box">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="lbimg" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="news-box" @click="notice">
        <van-icon name="volume-o" class="news-icon" />
        {{news}}
      </div>
    </div>

    <div>
      <van-swipe
        style="height:20px;"
        :autoplay="3000"
        vertical
        class="notice-box"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in noticeData" :key="item.index" @click="noticeview(item.id)">
          <van-icon name="volume-o" class="marginR2" color="#1989fa" />
          {{
          item.title
          }}
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-grid :border="false" :column-num="4">
      <van-grid-item @click="declaration">
        <div class="five-icon icon-box1">
          <span class="iconfont icondanjuqianshou" style="font-size:0.48rem"></span>
        </div>
        <span class="five-icon-text">会员报单</span>
      </van-grid-item>
      <van-grid-item @click="cash1">
        <div class="five-icon icon-box2">
          <span class="iconfont iconzhihuan" style="font-size:0.48rem"></span>
        </div>
        <span class="five-icon-text">备用金互转</span>
      </van-grid-item>
      <van-grid-item @click="cash2">
        <div class="five-icon icon-box3">
          <van-icon name="after-sale" />
        </div>
        <span class="five-icon-text">备用金置换</span>
      </van-grid-item>
      <van-grid-item>
        <div class="five-icon icon-box4">
          <span class="iconfont iconrichscan_icon" style="font-size:0.42rem"></span>
        </div>
        <span class="five-icon-text">扫一扫</span>
      </van-grid-item>
    </van-grid>
    <div class="hospital-fee-box">
      <div>
        <span class="iconfont iconyiyuan"></span>
        <span class="title">医院消费项目</span>
      </div>
      <span class="coloraeaeae" @click="moreactive">更多</span>
    </div>
    <div class="hospital-fee-content-box">
      <div class="hospital-fee-content">
        <img src="../../assets/images/fee1.png" />
        <div
          class="van-multi-ellipsis--l2"
        >项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行</div>
      </div>
      <div class="hospital-fee-content">
        <img src="../../assets/images/fee2.png" />
        <div
          class="van-multi-ellipsis--l2"
        >项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行</div>
      </div>
      <div class="hospital-fee-content">
        <img src="../../assets/images/fee3.png" />
        <div
          class="van-multi-ellipsis--l2"
        >项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行</div>
      </div>
      <div class="hospital-fee-content">
        <img src="../../assets/images/fee1.png" />
        <div
          class="van-multi-ellipsis--l2"
        >项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行项目名称最多显示两行</div>
      </div>
    </div>
    <img src="../../assets/images/sign.png" class="sign-img" />
    <div class="hospital-fee-box">
      <div>
        <span class="iconfont icontubiao_youhuizhekou"></span>
        <span class="title">折扣商城热销商品</span>
      </div>
      <span class="coloraeaeae" @click='gotoactive'>更多</span>
    </div>
    <div class="bottom-box">
      <div class="list-box" v-for="item in listData" :key="item.id" @click="getDetail(item.id)">
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

    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "../../components/tabBar.vue";
import * as homeApi from "../../axios/home.js";
import * as storage from "../../utils/storage.js";
import * as storeApi from "../../axios/store.js"
import { Dialog } from "vant";
export default {
  components: {
    tabBar,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      images: [],
      news: "新闻内容",
      newsId: "",
      newscon:"",
      noticeData: [],
      isSign: true,
      unbind: false,
      active: "",
      page: 1,
      limit: 10,
      // listData: [
      //   {
      //     id: 1,
      //     img: require("../../assets/images/car1.jpg"),
      //     title: "瑾曼诗尼生胶原蛋白角鲨烯面膜抗衰老长效补水",
      //     integral: "28.68"
      //   },
      //   {
      //     id: 2,
      //     img: require("../../assets/images/car2.jpg"),
      //     title: "韩国韩亦舒保湿补水面膜提拉紧致美白淡斑",
      //     integral: "17.99"
      //   },
      //   {
      //     id: 3,
      //     img: require("../../assets/images/car3.jpg"),
      //     title: "春暖花开小背包携带方便美丽俏佳人",
      //     integral: "22.99"
      //   },
      //   {
      //     id: 4,
      //     img: require("../../assets/images/car4.jpg"),
      //     title: "大码短款上衣显高显瘦",
      //     integral: "30.78"
      //   },
      //   {
      //     id: 5,
      //     img: require("../../assets/images/car5.jpg"),
      //     title: "特产内蒙古纯正羊肉汤",
      //     integral: "29.39"
      //   },
      //   {
      //     id: 6,
      //     img: require("../../assets/images/car6.jpg"),
      //     title: "特产玫瑰花饼香甜可口清香怡人办公室零食",
      //     integral: "8.98"
      //   }
      // ]
      listData:[]
    };
  },
  async created() {
    const token = localStorage.getItem("yimeng_token");
    //    console.log("token",token);
    if (token == "" || token == null) {
      this.$router.push({ path: "/" });
    }

    const bannerRes = await homeApi.banner();
    this.images = bannerRes.data;
    const noticeRes = await homeApi.publicNoticeLatest();
    // console.log(noticeRes);
    this.news = noticeRes.data.title;
    this.newsId = noticeRes.data.id;
    const res = await storeApi.getHotGoodsList(this.page, this.limit);
    this.listData = res.data
  },

  methods: {
    moreactive(){
      this.$toast('暂未开放，敬请期待')
    },
    gotoactive(){
      this.$router.push({path: '/onSale'})
    },
    declaration() {
      this.$router.push({ path: "/declaration" });
    },
    cash1() {
      this.$router.push({ path: "/cashTransfer" });
    },
    cash2() {
      this.$router.push({ path: "/cashReplacement" });
    },
    getDetail(id) {
      let info = {
        id: id
      }
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({path: "/goodsDetail"})
    },
    async notice() {
      const res = await homeApi.publicNoticeInfo(this.newsId);
      this.newscon = res.data.content;
      // console.log(res);
      Dialog.alert({
        title: this.news,
        message: this.newscon
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
