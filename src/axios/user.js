import http from "../utils/http";
import { createFormData } from "../utils/form";

//注册
export async function register(password,pay_password,mobile,invitecode,captcha) {
    const formData = createFormData({
      password,
      pay_password,
      mobile,
      invitecode,
      captcha
    });
    return await http.post("/api/Index/register", formData);
  }
//发送验证码
export async function send(mobile,event) {
    const formData = createFormData({
      mobile,
      event
    });
    return await http.post("/api/Sms/send", formData);
  }
//登录
export async function login(account,password) {
    const formData = createFormData({
      account,
      password
    });
    return await http.post("/api/Index/login", formData);
  }
//忘记密码
export async function resetPassword(newpassword,mobile,captcha) {
    const formData = createFormData({
      newpassword,
      mobile,
      captcha
    });
    return await http.post("/api/Index/resetPassword", formData);
  }
//重置支付密码
export async function resetPayPassword(newpassword,mobile,captcha) {
    const formData = createFormData({
      newpassword,
      mobile,
      captcha
    });
    return await http.post("/api/Index/resetPayPassword", formData);
  }
