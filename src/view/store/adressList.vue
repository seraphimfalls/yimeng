<template>
  <div>
    <nav-bar id="reset" title="收货地址列表"></nav-bar>
    <div class="bottom-box">
      <van-swipe-cell v-for="item in list" :key="item.id">
        <div class="width96 flex-box-between border-bottom2">
          <div class="adress-box" @click="select(item.id)">
            <div class="font32 textLeft flex-box">
              <span class="marginR2">{{item.receiver_name}}</span>
              {{item.receiver_mobile}}
              <van-tag type="danger" v-if="item.is_default==1" round>默认地址</van-tag>
            </div>
            <div class="font28 textLeft flex-box line-height2">{{item.receiver_address}}</div>
          </div>
          <div class="btn_box flex-box font28">
            <van-button
              type="primary"
              size="mini"
              v-if="item.is_default==0"
              @click="setting(item.id)"
            >设为默认</van-button>
            <van-button type="info" size="mini" @click="edit(item.id)">编辑</van-button>
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="del(item.id)" />
        </template>
      </van-swipe-cell>
    </div>

    <van-button type="danger" class="buyBtn" @click="add">新增地址</van-button>
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
  inject: ["reload"],
  data() {
    return {
      mobile: "13000001001",
      chosenAddressId: "1",
      list: [],
      id: "",
      type: "",
      num: ""
    };
  },
  async created() {
    console.log(123)
    let data = JSON.parse(sessionStorage.getItem("info"));
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.num = data.num;
    }

      //请求地址列表接口
      const res = await storeApi.getMyAddressList();
      // console.log(res);
      this.list = res.data;
  },
  methods: {
    add() {
      let info = {
        id: this.id,
        type: this.type,
        num: this.num
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/addAdress" });
    },
    select(adressId) {
      let info = {
        id: this.id,
        type: this.type,
        num: this.num,
        adressId
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      // this.$router.push({ path: "/order" });
    },
    async setting(adressId) {
      const res = await storeApi.setDefaultAddress(adressId);
      if (res.code == 1) {
        this.$toast.success(res.msg);
        this.reload();
      } else this.$toast.fail(res.msg);
    },
    edit(adressId) {
      let info = {
        id: this.id,
        type: this.type,
        num: this.num,
        adressId
      };
      // console.log(info)
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({ path: "/addAdress" });
    },
    del(adressId) {
      Dialog.confirm({
        message: "确认删除这条地址吗"
      })
        .then(() => {
          this.delete(adressId);
        })
        .catch(() => {
          // on cancel
        });
    },
    async delete(adressId) {
      const res = await storeApi.deleteAddress(id);
      // console.log(res)
      if (res.code == 1) {
        this.$toast.success(res.msg);
      } else {
        this.$toast.fail(res.msg);
      }
    }
  }
};
</script>
<style lang="less" scope>
.delete-button {
  height: 100%;
}
.adress-box {
  width: 75%;
}
.van-swipe-cell /deep/ .van-swipe-cell__right {
  display: flex;
}
.buyBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
}
.bottom-box {
  padding-bottom: 0.98rem;
}
.btn_box{
  width: 2.5rem !important;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
