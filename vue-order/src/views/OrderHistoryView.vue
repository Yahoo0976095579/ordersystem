<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order";
import { useCartStore } from "@/stores/cart";
import { showToast } from "@/utils/toast.js";

const orderStore = useOrderStore();
const cartStore = useCartStore();
const router = useRouter();

// 直接從 store 中獲取 orders 狀態
const { orders } = storeToRefs(orderStore);

// 新增：一個 computed property，將訂單反向排序，讓最新的訂單顯示在最上面
const sortedOrders = computed(() => {
  // 使用 slice() 來建立一個 orders 的淺拷貝，避免直接修改 store 中的狀態
  return orders.value.slice().reverse();
});

// 新增：處理「再次購買」的函式
function reorder(order) {
  // 清空目前的購物車，避免商品重複
  cartStore.clearCart();
  // 將該筆訂單的所有商品重新加入購物車
  order.orderItems.forEach((item) => {
    // 注意：addToCart 需要 product 物件和 quantity
    cartStore.addToCart(item.product, item.quantity);
  });
  showToast("已將商品重新加入購物車！");
  // 跳轉到購物車頁面，讓使用者可以立即結帳
  router.push("/cart");
}

// 新增：一個輔助函式，用來將英文的付款方式轉換為中文
function formatPaymentMethod(method) {
  switch (method) {
    case "cash":
      return "現金支付";
    case "credit_card":
      return "信用卡";
    case "line_pay":
      return "LINE Pay";
    default:
      return "未指定";
  }
}
</script>

<template>
  <div class="order-history-view">
    <h1>訂單紀錄</h1>

    <div v-if="sortedOrders.length === 0" class="status-message">
      您還沒有任何訂單紀錄。
    </div>

    <div v-else class="order-list">
      <!-- 使用 v-for 遍歷反向排序後的訂單 -->
      <div v-for="order in sortedOrders" :key="order.id" class="order-card">
        <div class="card-header">
          <div>
            <span class="order-date">{{
              new Date(order.orderDate).toLocaleString()
            }}</span>
            <span class="order-id">訂單編號: #{{ order.id }}</span>
          </div>
        </div>

        <ul class="order-items">
          <li v-for="item in order.orderItems" :key="item.id">
            <span class="item-name">{{ item.product.name }}</span>
            <span class="item-qty">x {{ item.quantity }}</span>
            <span class="item-price"
              >${{ (item.price * item.quantity).toFixed(2) }}</span
            >
          </li>
        </ul>

        <div class="card-footer">
          <div class="payment-info">
            付款方式:
            <strong>{{ formatPaymentMethod(order.paymentMethod) }}</strong>
          </div>
          <div class="total-amount">
            總金額: <strong>${{ order.totalAmount.toFixed(2) }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-history-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.status-message {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #666;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden; /* 確保子元素的圓角不會超出 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.order-date {
  font-size: 0.9rem;
  color: #555;
  display: block;
}

.order-id {
  font-size: 0.8rem;
  color: #888;
}

.reorder-btn {
  background-color: #f0ad4e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reorder-btn:hover {
  background-color: #ec971f;
}

.order-items {
  list-style: none;
  padding: 0.5rem 1.5rem;
}

.order-items li {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  align-items: center;
}

.order-items li:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.item-name {
  font-weight: 500;
}

.item-qty,
.item-price {
  text-align: right;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  font-size: 1.1rem;
}

.payment-info strong,
.total-amount strong {
  color: #333;
}
</style>
