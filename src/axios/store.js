import http from "../utils/http";
import { createFormData } from "../utils/form"

//商城banner
export async function banner() {
    const formData = createFormData({

    });
    return await http.post("/api/Page/shoppingBanner", formData);
}
//获取搜索页面关键词
export async function getMyKeywords(){
    const formData = createFormData({

    });
    return await http.post("/api/User/getMyKeywords", formData)
}
//获取热卖商品列表
export async function getHotGoodsList(limit){
    const formData = createFormData({
        limit
    });
    return await http.post("/api/Index/getHotGoodsList", formData)
}
//获取商品分类
export async function getGoodsCategoryList(){
    const formData = createFormData({

    })
    return await http.post("/api/Index/getGoodsCategoryList", formData)
}
//根据商品分类获取商品列表
export async function getGoodsListByCategoryId(category_id, page, limit){
    const formData = createFormData({
        category_id, 
        page,
        limit
    })
    return await http.post("/api/Index/getGoodsListByCategoryId", formData)
}
//获取商品详情
export async function getGoodsDetail(id){
    const formData = createFormData({
        id
    })
    return await http.post("/api/Index/getGoodsDetail", formData)
}
//获取我的收货地址列表
export async function getMyAddressList() {
    const formData = createFormData({
        
    });
    return await http.post("/api/User/getMyAddressList", formData);
}
//普通商品下单
export async function createGoodsOrder(address_id,goods_id,goods_num) {
    const formData = createFormData({
      address_id,
      goods_id,
      goods_num
    });
    return await http.post("/api/Shoppingorder/createGoodsOrder", formData);
}
//获取收货地址详情
export async function getAddressDetail(id) {
    const formData = createFormData({
      id
    });
    return await http.post("/api/User/getAddressDetail", formData);
}
//获取活动商品详情
export async function getMyLeftCount(id) {
    const formData = createFormData({
     id
    });
    return await http.post("/api/Shoppingorder/getMyLeftCount", formData);
  }
//设置地址为默认地址
export async function setDefaultAddress(id) {
    const formData = createFormData({
      id
    });
    return await http.post("/api/User/setDefaultAddress", formData);
  }
//删除收货地址
export async function deleteAddress(id) {
    const formData = createFormData({
      id
    });
    return await http.post("/api/User/deleteAddress", formData);
  }
//新增/修改收货地址
export async function addOrModifyAddress(id,receiver_address,receiver_name,receiver_mobile) {
    const formData = createFormData({
      id,
      receiver_address,
      receiver_name,
      receiver_mobile
    });
    return await http.post("/api/User/addOrModifyAddress", formData);
  }
//取消订单
export async function cancelShoppingOrder(shopping_order_id) {
    const formData = createFormData({
      shopping_order_id
    });
    return await http.post("/api/Shoppingorder/cancelShoppingOrder", formData);
  }
//确认收货
export async function confirmOrder(shopping_order_id) {
    const formData = createFormData({
      shopping_order_id
    });
    return await http.post("/api/Shoppingorder/confirmOrder", formData);
  }
//查看物流信息
export async function getExpressInfo(shopping_order_id) {
    const formData = createFormData({
      shopping_order_id
    });
    return await http.post("/api/Shoppingorder/getExpressInfo", formData);
  }
//获取我的商品订单列表
export async function getMyGoodsOrderList(status,page,limit) {
    const formData = createFormData({
      status,
      page,
      limit
    });
    return await http.post("/api/User/getMyGoodsOrderList", formData);
  }
//获取活动商品列表
export async function getSpecialGoodsList(activity_id,page,limit) {
  const formData = createFormData({
    activity_id,
    page,
    limit
  });
  return await http.post("/api/Index/getSpecialGoodsList", formData);
}
//获取活动列表
export async function getActivityList() {
  const formData = createFormData({
   
  });
  return await http.post("/api/Index/getActivityList", formData);
}
//获取活动商品详情
export async function getSpecialGoodsDetail(id) {
  const formData = createFormData({
   id
  });
  return await http.post("/api/Index/getSpecialGoodsDetail", formData);
}
//确认支付
export async function pay(shopping_order_id,pay_password) {
  const formData = createFormData({
    shopping_order_id,
    pay_password
  });
  return await http.post("/api/Shoppingorder/pay", formData);
}
//确认订单页信息详情
export async function confirmPayInfo(shopping_order_id) {
  const formData = createFormData({
    shopping_order_id
  });
  return await http.post("/api/Shoppingorder/confirmPayInfo", formData);
}
//根据关键词搜索获取商品列表
export async function getGoodsListByKeyword(keyword, page, limit) {
  const formData = createFormData({
    keyword, 
    page, 
    limit
  });
  return await http.post("/api/User/getGoodsListByKeyword", formData);
}