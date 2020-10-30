<template>
  <div>
    <nav-bar id="reset" title="订单详情"></nav-bar>

    <div class="order-list-box">
      <div class="list-box-top">
        <span>{{order_number}}</span>
        {{status}}
      </div>
      <div class="adress-box">
        <div class="textLeft flex-box">
          <span class="marginR2">{{receiver_name}}</span>
          {{receiver_mobile}}
        </div>
        <div class="font28 textLeft flex-box line-height2">{{receiver_address}}</div>
      </div>
      <van-card :num="num" :price="price" :title="title" :thumb="img" class="textLeft">
        <!-- <template #footer>订单金额：{{amount}}</template> -->
      </van-card>
      <div class="flex-box-between width96 margin2">
        <span class="coloraeaeae">订单金额：</span>
        <span>{{amount}}</span>
      </div>
      <div class="flex-box-between width96 margin2 border-bottom2">
        <span class="coloraeaeae">下单时间：</span>
        <span>{{createtime}}</span>
      </div>
      <div class="flex-box-between width96 margin2 border-bottom2" v-show="isyqx">
        <span class="coloraeaeae">取消时间：</span>
        <span>{{cancel_time}}</span>
      </div>
      <div class="list-box-bottom" v-show="isdzf">
        <van-button type="warning" class="marginR2" size="small" @click="cancel">取消订单</van-button>
        <van-button type="info" size="small" @click="pay">去支付</van-button>
      </div>
      <div class="list-other-box border-bottom2" v-show="isdfh">
        <van-divider class="font600">支付信息</van-divider>
        <div class="flex-box-between">
          <span class="coloraeaeae">已支付</span>
          <span>{{amount}}</span>
        </div>
        <div class="flex-box-between">
          <span class="coloraeaeae">支付方式</span>
          <span>{{pay_type}}</span>
        </div>
        <div class="flex-box-between">
          <span class="coloraeaeae">支付时间</span>
          <span>{{pay_time}}</span>
        </div>
      </div>
      <div class="list-other-box border-bottom2" v-show="isdsh">
        <van-divider class="font600">发货信息</van-divider>
        <div class="flex-box-between">
          <span class="coloraeaeae">物流单号</span>
          {{express_number}}
        </div>
        <div class="flex-box-between">
          <span class="coloraeaeae">发货时间</span>
          {{send_time}}
        </div>
      </div>
      <div class="list-other-box border-bottom2" v-show="isywc">
        <van-divider class="font600">收货信息</van-divider>
        <div class="flex-box-between">
          <span class="coloraeaeae">收货时间</span>
          {{finish_time}}
        </div>
        <div class="list-box-bottom">
          <van-button type="primary" size="small" @click="expressInfo">查看物流</van-button>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="show" title="标题">
      <div class="content">
         <van-steps direction="vertical" :active="0">
          <van-step v-for="item in express" :key="item.id">
            <h3>{{item.context}}</h3>
            <p>{{item.ftime}}</p>
          </van-step>
        </van-steps>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
import { Dialog } from "vant";
export default {
  components: {
    navBar,
     [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      id: "",
      order_number: "",
      receiver_name: "",
      receiver_mobile: "",
      receiver_address: "",
      creatTime: "",
      status: "",
      num: "",
      price: "",
      title: "",
      img: "",
      orderId: "",
      amount: "",
      createtime: "",
      pay_type: "",
      pay_time: "",
      express_number: "",
      send_time: "",
      finish_time: "",
      cancel_time:"",
      isdzf: false,
      isdfh: false,
      isdsh: false,
      isywc: false,
      show: false,
      express:[],
      show: false,
      isyqx:false
    };
  },
  async created() {
    let data = JSON.parse(sessionStorage.getItem("info"));
    this.orderId = data.orderId;
    const res = await storeApi.getShoppingOrderDetail(this.orderId);
    // console.log(res);
    this.id = res.data.id;
    this.receiver_name = res.data.receiver_name;
    this.receiver_mobile = res.data.receiver_mobile;
    this.receiver_address = res.data.receiver_address;
    this.img = res.data.goods_image;
    this.title = res.data.goods_title;
    this.num = res.data.goods_num;
    this.amount = res.data.amount;
    this.price = res.data.price;
    this.createtime = res.data.createtime;
    this.order_number = res.data.order_number;
    this.express_number = res.data.express_number;
    this.send_time = res.data.send_time;
    this.pay_type = res.data.pay_type;
    this.pay_time = res.data.pay_time;
    this.finish_time = res.data.finish_time;
    this.cancel_time = res.data.cancel_time;
    if (res.data.status == 0) {
      this.status = "待支付";
      this.isdzf = true;
    } else if (res.data.status == 1) {
      this.status = "待发货";
      this.isdfh = true;
    } else if (res.data.status == 2) {
      this.status = "待收货";
      this.isdfh = true;
      this.isdsh = true;
    } else if (res.data.status == 3) {
      this.status = "已取消";
      this.isyqx=true
    } else if (res.data.status == 4) {
      this.status = "已完成";
      this.isdfh = true;
      this.isdsh = true;
      this.isywc = true;
    }
  },
  methods: {
    async expressInfo() {
      const res = await storeApi.getExpressInfo(this.orderId);
      if(res.code==1){
         this.show = true;
        this.express = res.data
      }else{
         this.show = false;
        this.$toast.fail(res.msg)
      }
    },
     cancel() {
      Dialog.confirm({
        message: "确认取消这个订单吗"
      })
        .then(() => {
          this.del();
        })
        .catch(() => {
          // on cancel
        });
    },
    async del() {
      const res = await storeApi.cancelShoppingOrder(this.orderId);
      if (res.code == 1) {
        this.$toast.success(res.msg);
        this.$router.push({path:"/myOrder"})
      } else {
        this.$toast.fail(res.msg);
      }
    },
    pay(){
       let info = {
        orderId: this.orderId
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/orderPay" });
    }
  }
};
</script>
<style lang="less" scope>
.adress-box {
  width: 94%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
}
.order-list-box {
  font-size: 0.28rem;
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
.list-box-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  line-height: 2em;
  width: 94%;
  margin: 0.2rem auto;
  padding: 0 0.1rem;
  box-sizing: border-box;
  background: #f7f7f7;
}
.list-box-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 94%;
  margin: 0.2rem auto;
}
.list-other-box {
  width: 94%;
  margin: 0.2rem auto;
  line-height: 2em;
}
 .content {
    padding: 16px 16px 160px;
  }
  #reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
