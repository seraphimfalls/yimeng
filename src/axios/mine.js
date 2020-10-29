import http from "../utils/http";
import { createFormData } from "../utils/form";

//我的
export async function getAccount() {
  const formData = createFormData({
  });
  return await http.post("/api/User/getAccount", formData);
}
//退出
export async function logout() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/logout", formData);
}
//申请成为报单中心
export async function applyService() {
  const formData = createFormData({
  });
  return await http.post("/api/User/applyService", formData);
}
//获取我的团队
export async function getMyTeam(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("/api/User/getMyTeam", formData);
}
//提现地址
export async function modifyWithdrawInfo(type,alipay_account,alipay_real_name,wx_account,bank_name,cardholder,card_number) {
  const formData = createFormData({
    type,
    alipay_account,
    alipay_real_name,
    wx_account,bank_name,
    cardholder,
    card_number
  });
  return await http.post("/api/User/modifyWithdrawInfo", formData);
}

//上传文件
export async function upload(file) {
  const formData = createFormData({
    file
  });
  return await http.post("/api/common/upload", formData);
}
//报单记录
export async function orderList(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("/api/Order/orderList", formData);
}