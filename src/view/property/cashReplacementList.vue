<template>
  <div>
    <nav-bar title="备用金置换记录"></nav-bar>
   <div class="cash-list-box" v-for="item in listData" :key="item.id">
     <div class="title">
       {{item.createtime}}
       <span>{{item.status_name}}</span>
     </div>
     <div class="flex-box-between margin2">
       本次置换
       <span>{{item.real_amount}}元</span>
     </div>
     <div class="flex-box-between margin2">
       使用备用金
       <span>{{item.score}}个</span>
     </div>
     <div class="flex-box-between margin2">
       期限
       <span>{{item.limit_days}}天</span>
     </div>
     <div class="flex-box-between margin2">
       还款日
       <span v-if="item.status==0">{{item.repay_date}}（待还款）</span>
       <span v-else-if="item.status==1">{{item.repay_date}}（已逾期）</span>
       <span v-else-if="item.status==2">{{item.repay_date}}（已还款）</span>
     </div>
      <div class="flex-box-between margin2" v-if="item.status==0">
       操作
       <van-button type="primary" size="small" @click="repayment(item.id)">还款</van-button>
     </div>
   </div>
 

  
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
    page:1,
    limit:10,
    listData:[]
    };
  },
async created(){
const res = await assetsApi.substitutionList(this.page,this.limit)
 console.log(res)
this.listData = res.data
},
  methods: {
   repayment(id){
     this.$router.push({path:'/cashRepayment',query:{id:id}})
   }
  }
};
</script>
<style lang="less" scope>
</style>
