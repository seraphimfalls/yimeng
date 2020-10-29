<template>
  <div>
    <nav-bar id="reset" title="下单"></nav-bar>
    <div class="width96 flex-box-between" v-show="isShow">
      <div class="adress-box" @click="adressList">
        <div class="font32 textLeft flex-box">
          <span class="marginR2">{{name}}</span>
          {{mobile}}
        </div>
        <div class="font28 textLeft flex-box line-height2">{{adress}}</div>
      </div>
      <van-icon name="edit" @click="edit" class="font36" />
    </div>
    <div class="width96 flex-bo font28" v-show="!isShow" @click="addAdress">
      <h4>请先添加地址</h4>
    </div>
    <div class="detail-box textLeft">
      <van-card :title="title" :thumb="image" />
      <div class="width96 flex-box-between font28">
        购买数量
        <van-stepper v-model="value" :max="max" @change="onChange" />
      </div>
      <div class="width96 flex-box-between font28">
        价格
        <span>{{price}}</span>
      </div>
      <div class="width96 flex-box-between font28">
        金额
        <span>{{money}}</span>
      </div>
    </div>
    <van-button type="danger" class="buyBtn" @click="order">确认下单</van-button>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      name: "",
      adress: "",
      mobile: "",
      value: 1,
      price: "",
      money: "",
      id: "",
      image: "",
      title: "",
      type: "",
      max: 99,
      min: 5,
      isShow: false,
      adressId: ""
    };
  },
  async created() {
    let data = JSON.parse(sessionStorage.getItem("info"));
    // console.log(data);
    this.id = data.id;
    this.type = data.type;
    this.adressId = data.adressId;
    this.value = data.num;
    if (data.num == "" || data.num == null || data.num == undefined) {
      this.value = 1;
    } else {
      this.value = data.num;
    }
    //首先判断存储文件里adressId有没有值，有值就请求地址详情接口，没有就请求地址列表接口，获取默认地址
    // console.log(this.adressId);
    if (
      this.adressId == "" ||
      this.adressId == null ||
      this.adressId == undefined
    ) {
      const adressData = await storeApi.getMyAddressList();
      if (adressData.data) {
        this.isShow = true;
        const adress = adressData.data.find(ele => ele.is_default == 1);
        // console.log(adress);
        this.name = adress.receiver_name;
        this.mobile = adress.receiver_mobile;
        this.adress = adress.receiver_address;
        this.adressId = adress.id;
      } else {
        this.isShow = false;
      }
    } else {
      this.isShow = true;
      const res = await storeApi.getAddressDetail(this.adressId);
      // console.log(res);
      this.name = res.data.receiver_name;
      this.mobile = res.data.receiver_mobile;
      this.adress = res.data.receiver_address;
    }

    //请求商品详情接口
    const res = await storeApi.getGoodsDetail(this.id);
    // console.log(res);
    this.image = res.data.image;
    this.title = res.data.title;
    this.price = res.data.price;
    this.money = (parseFloat(this.price) * parseInt(this.value)).toFixed(2);
    if (this.type == 1) {
      const numRes = await storeApi.getMyLeftCount(this.id);
      this.max = numRes.data;
    } else {
      this.max = 99;
    }
  },
  methods: {
    onChange() {
      this.money = (parseFloat(this.price) * parseInt(this.value)).toFixed(2);
    },
    adressList() {
      let info = {
        id: this.id,
        type: this.type,
        num: this.value
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/adressList" });
    },
    edit() {
      let info = {
        id: this.id,
        type: this.type,
        adressId: this.adressId,
        num: this.value
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/addAdress" });
    },
    async order() {
      //type==0是普通商品下单，type==1是活动商品下单
      if (this.type == 0) {
        const res = await storeApi.createGoodsOrder(
          this.adressId,
          this.id,
          this.value
        );
        // console.log(res);
        if (res.code == 1) {
          let info = {
            orderId: res.data
          };
          sessionStorage.setItem("info",JSON.stringify(info))
          this.$router.push({ path: "/orderPay" });
        }else{
          this.$toast.fail(res.msg)
        }
      }
    },
    addAdress() {
      let info = {
        id: this.id,
        type: this.type,
        num: this.value
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/addAdress" });
    }
  }
};
</script>
<style lang="less" scope>
.adress-box {
  width: 90%;
}
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
