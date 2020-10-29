<template>
  <div>
    <nav-bar id="reset" title="新增/编辑地址"></nav-bar>
    <van-cell-group class="width96 font28">
      <van-field v-model="receiver_name" label="收货人" placeholder="请输入收货人姓名" />
      <van-field v-model="tel" label="联系方式" placeholder="请输入联系方式" />
      <van-field v-model="receiver_address" label="收货地址" placeholder="请输入收货人地址" />
    </van-cell-group>
    <div class="width96 flex-box-center">
      <van-button type="danger" @click="onSave">保存地址</van-button>
    </div>
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
      receiver_name: "",
      tel: "",
      receiver_address: "",
      adressId: 0,
      id:"",
      type:"",
      num:"",
    };
  },
  async created() {
    let data = JSON.parse(sessionStorage.getItem("info"))
     this.id = data.id;
     this.type = data.type;
     this.num = data.num;
    if (
      data.adressId == "" ||
      data.adressId == null ||
      data.adressId == undefined
    ) {
      this.adressId = 0;
    } else {
      this.adressId = data.adressId;
      const res = await storeApi.getAddressDetail(this.adressId);
      // console.log(res);
      this.receiver_name = res.data.receiver_name
      this.tel = res.data.receiver_mobile
      this.receiver_address = res.data.receiver_address
    }
  },
  methods: {
    async onSave() {
      const res = await storeApi.addOrModifyAddress(
        this.adressId,
        this.receiver_address,
        this.receiver_name,
        this.tel
      );
      if (res.code == 1) {
        this.$toast.success(res.msg);
        let info={
          id:this.id,
          type:this.type,
          num:this.num,
          adressId:this.adressId
        }
        sessionStorage.setItem("info",JSON.stringify(info))
        this.$router.push({ path: "/adressList"});
      } else {
        this.$toast.fail(res.msg);
      }
    }
  }
};
</script>
<style lang="less" scope>
.width96 /deep/ .van-field__label{
  margin-right:0.2rem;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
