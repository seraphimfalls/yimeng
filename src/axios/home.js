import http from "../utils/http";
import { createFormData } from "../utils/form";

//banner
export async function banner() {
  const formData = createFormData({
  });
  return await http.post("/api/Page/banner", formData);
}
//获取广告信息
export async function publicNoticeLatest() {
  const formData = createFormData({
  });
  return await http.post("/api/Page/publicNoticeLatest", formData);
}
//公告详情
export async function publicNoticeInfo(id) {
  const formData = createFormData({
    id
  });
  return await http.post("/api/Page/publicNoticeInfo", formData);
}
