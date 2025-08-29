<script setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart"; // 我们需要用它来清空购物车

const route = useRoute();
const cartStore = useCartStore();

// 从路由的 state 中获取订单资料
// 如果没有资料，则提供一个默认值以防出错
const orderDetails = computed(() => {
  // window.history.state 是一个浏览器原生 API，可以获取路由跳转时附带的状态
  return window.history.state.order || null;
});

// 在页面创建时，确认清空购物车
// 这样做可以防止使用者按返回键回到购物车时，看到旧的商品
cartStore.clearCart();
</script>

<template>
  <div class="order-success-view">
    <div v-if="orderDetails" class="confirmation-box">
      <div class="icon">✅</div>
      <h1>下單成功！</h1>

      <h2>訂單明細</h2>
      <ul class="order-items">
        <li v-for="item in orderDetails.orderItems" :key="item.id">
          <span class="item-name">{{
            item.product?.name || "商品已下架"
          }}</span>
          <span class="item-qty">x {{ item.quantity }}</span>
          <span class="item-price"
            >${{ (item.price * item.quantity).toFixed(2) }}</span
          >
        </li>
      </ul>

      <RouterLink to="/" class="back-home-btn">返回首頁</RouterLink>
    </div>
    <div v-else class="error-box">
      <h2>無法載入訂單詳情</h2>
      <p>可能是因為刷新了頁面。</p>
      <RouterLink to="/" class="back-home-btn">返回首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.order-success-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.confirmation-box,
.error-box {
  max-width: 500px;
  width: 100%;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
h1 {
  margin-bottom: 0.5rem;
}
.order-id {
  margin-bottom: 2rem;
  color: #555;
}
h2 {
  text-align: left;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}
.order-items {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}
.order-items li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.item-name {
  text-align: left;
  flex-grow: 1;
}
.item-qty {
  margin: 0 1rem;
}
.total-summary {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  border-top: 2px solid #333;
  padding-top: 1rem;
  margin-bottom: 2rem;
}
.back-home-btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
</style>
