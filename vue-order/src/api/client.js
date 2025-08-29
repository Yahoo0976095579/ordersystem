import axios from "axios";
import { API_BASE_URL } from "@/config.js";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 可以在這裡加入請求或回應攔截器，統一處理錯誤或 token

export default apiClient;

// 在 ProductDetailView.vue
import apiClient from "@/api/client.js"; // 引入我們建立的客戶端

// ...
const response = await apiClient.get(`/api/Products/${props.id}`);
// ...
