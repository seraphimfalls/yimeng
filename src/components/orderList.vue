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
      <div
        class="order-list-box"
        v-for="item in listData"
        :key="item.id"
        @click="getDetail(item.id)"
      >
        <div class="list-box-top">
          <span>{{item.createtime}}</span>
          <span v-if="item.status==0">待支付</span>
          <span v-else-if="item.status==1">待发货</span>
          <span v-else-if="item.status==2">待收货</span>
          <span v-else-if="item.status==3">已取消</span>
          <span v-else-if="item.status==4">已完成</span>
        </div>
        <van-card class="textLeft" :num="item.count" :price="item.price" :title="item.title" :thumb="item.image">
          <template #footer>订单金额：{{item.amount}}</template>
        </van-card>
        <div class="list-box-bottom" v-if="item.status==0">
          <van-button
            type="warning"
            class="marginR2"
            size="small"
            @click.stop="cancel(item.id)"
          >取消订单</van-button>
          <van-button type="info" size="small" @click.stop="pay(item.id)">去支付</van-button>
        </div>
        <div class="list-box-bottom" v-else-if="item.status==2">
          <van-button
            type="primary"
            class="marginR2"
            size="small"
            @click.stop="expressInfo(item.id)"
          >查看物流</van-button>
          <van-button type="info" size="small" @click.stop="confirm(item.id)">确认收货</van-button>
        </div>
      </div>
    </van-list>
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
import * as storeApi from "../axios/store.js";
import { Dialog } from "vant";
export default {
  name: "orderList",
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  inject: ["reload"],
  props: ["listType"],
  data() {
    return {
      page: 1,
      limit: 10,
      offest: 10,
      loading: false,
      finished: false,
      listData: [],
      express:[],
      show: false,
      orderPrice:""
    };
  },
  methods: {
    async onLoad() {
      let res = await storeApi.getMyGoodsOrderList(
        this.listType,
        this.page,
        this.limit
      );
        // console.log(res)
      if (res.data.length < 10) {
        this.finished = true;
      }
      this.page = this.page + 1;
      this.listData = this.listData.concat(res.data);
      this.loading = false;
    },
    cancel(id) {
      Dialog.confirm({
        message: "确认取消这个订单吗"
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {
          // on cancel
        });
    },
    async del(id) {
      const res = await storeApi.cancelShoppingOrder(id);
      if (res.code == 1) {
        this.$toast.success(res.msg);
        this.reload();
      } else {
        this.$toast.fail(res.msg);
      }
    },
    async confirm(id) {
      const res = await storeApi.confirmOrder(id);
      if (res.code == 1) {
        this.$toast.success(res.msg);
        this.reload();
      } else {
        this.$toast.fail(res.msg);
      }
    },
    pay(id) {
      let info = {
        orderId: id
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/orderPay" });
    },
    getDetail(id) {
      let info = {
        orderId: id
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/orderDetail" });
    },
    async expressInfo(id) {
      const res = await storeApi.getExpressInfo(id);
      if(res.code==1){
         this.show = true;
        this.express = res.data
      }else{
         this.show = false;
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>
<style scoped>
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
</style>
