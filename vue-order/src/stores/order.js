import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useSessionStore } from "./session";

const MOCK_SESSION_ID = "mock-data-session";
const mockOrderHistory = [
  {
    id: 1,
    orderDate: new Date(),
    totalAmount: 260,
    paymentMethod: 'credit_card', // 新增
    orderItems: [
      {
        id: 1,
        product: { id: 1, name: "經典牛肉漢堡", price: 180 },
        quantity: 1,
        price: 180,
      },
      {
        id: 2,
        product: { id: 4, name: "美式炸薯條", price: 80 },
        quantity: 1,
        price: 80,
      },
    ],
  },
  {
    id: 2,
    orderDate: new Date(),
    totalAmount: 120,
    paymentMethod: 'cash', // 新增
    orderItems: [
      {
        id: 3,
        product: { id: 6, name: "冰檸檬紅茶", price: 60 },
        quantity: 2,
        price: 60,
      },
      {
        id: 4,
        product: { id: 4, name: "美式炸薯條", price: 80 },
        quantity: 1,
        price: 80,
      },
    ],
  },
];

export const useOrderStore = defineStore("order", () => {
  // State: 存放所有訂單的陣列
  const orders = ref([]);

  // Action: 初始化訂單 (在歷史頁面載入時呼叫)
  // 【核心修改】initializeOrders 接受一个参数
  function initializeOrders(currentSessionId) {
    if (currentSessionId === MOCK_SESSION_ID) {
      orders.value = mockOrderHistory;
    } else {
      orders.value = [];
    }
  }

  // Action: 新增一筆訂單 (在送出訂單時呼叫)
  function addOrder(newOrderData) {
    const newOrder = {
      id: Date.now(), // 用時間戳記作為唯一的 mock ID
      orderDate: new Date(),
      totalAmount: newOrderData.totalAmount,
      paymentMethod: newOrderData.paymentMethod, // <--- 新增這一行
      orderItems: newOrderData.orderItems.map((item, index) => ({
        id: Date.now() + index,
        product: { ...item }, // 複製商品資訊
        quantity: item.quantity,
        price: item.price,
      })),
    };
    orders.value.push(newOrder);
  }

  // Action: 清空所有訂單 (在結帳時呼叫)
  function clearOrders() {
    orders.value = [];
  }

  // Getters (Computed Properties) - 將合併邏輯也移到這裡，集中管理
  const mergedOrderItems = computed(() => {
    const itemMap = new Map();
    for (const order of orders.value) {
      for (const item of order.orderItems) {
        if (item.product) {
          const productId = item.product.id;
          if (itemMap.has(productId)) {
            itemMap.get(productId).quantity += item.quantity;
          } else {
            itemMap.set(productId, {
              ...item.product,
              quantity: item.quantity,
            });
          }
        }
      }
    }
    return Array.from(itemMap.values());
  });

  const grandTotal = computed(() => {
    return mergedOrderItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  return {
    orders,
    addOrder,
    clearOrders,
    initializeOrders,
    mergedOrderItems,
    grandTotal,
  };
});
