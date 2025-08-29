import { ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useOrderStore } from "./order"; // 引入 order store

export const useSessionStore = defineStore("session", () => {
  const sessionId = ref(null);

  function initializeSession() {
    const orderStore = useOrderStore();
    let storedId = localStorage.getItem("sessionId");

    if (!storedId) {
      // 如果是第一次访问，直接产生一个新的 session
      storedId = uuidv4();
      localStorage.setItem("sessionId", storedId);
    }

    sessionId.value = storedId;

    // 【核心修改】在这里根据 sessionId 初始化订单
    orderStore.initializeOrders(sessionId.value);
  }

  function startNewSession() {
    const orderStore = useOrderStore();
    const newId = uuidv4();
    localStorage.setItem("sessionId", newId);
    sessionId.value = newId;

    // 【核心修改】开始新 session 时，也清空订单
    orderStore.clearOrders();

    console.log("一個新的用餐會話已開始，ID:", newId);
  }

  return { sessionId, startNewSession, initializeSession };
});
