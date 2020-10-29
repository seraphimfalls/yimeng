<template>
  <div>
    <nav-bar id="reset" title="订单支付"></nav-bar>
    <div class="width96 font28 line-height2 padding-left2 bgf7f7f7 textLeft">
      <h5>订单信息</h5>
    </div>
    <div class="width96 flex-box-between font28">
      <span>订单编号</span>
      {{orderNum}}
    </div>
    <div class="width96 flex-box-between font28">
      <span>下单时间</span>
      {{time}}
    </div>
    <div class="width96 flex-box-between font28">
      <span>订单金额</span>
      {{money}}
    </div>
    <div class="width96 font28 line-height2 padding-left2 bgf7f7f7 textLeft">
      <h5>付款方式</h5>
    </div>
    <div class="width96 flex-box-between font28">余额：{{balance}}</div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      v-show="isShow"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      v-show="isShow"
      @blur="showKeyboard = false"
    />
    <van-button type="danger" class="buyBtn" @click="pay">确认支付{{money}}</van-button>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      orderNum: "",
      time: "",
      money: "",
      value: "",
      showKeyboard: true,
      isShow: false,
      orderId:"",
      pay_type:"",
      balance:""
    };
  },
  async created() {
    let data = JSON.parse(sessionStorage.getItem("info"))
    this.orderId=data.orderId
    const res = await storeApi.confirmPayInfo(this.orderId)
    this.orderNum = res.data.order_number
    this.time=res.data.createtime
    this.money =res.data.amount
    this.pay_type=res.data.pay_type
    const infoRes = await mineApi.getAccount();
    this.balance = infoRes.data.money;

  },
  methods: {
    pay() {
      this.isShow = true;
      this.value=""
    },
    
   async onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.isShow = false;
         const res = await storeApi.pay(this.orderId,this.value)
          if(res.code==1){
            this.$toast.success(res.msg)
            this.$router.push({path:"myOrder"})
          }else{
            this.$toast.fail(res.msg)
          }
      }
    },
   
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>
<style lang="less" scope>
.buyBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
