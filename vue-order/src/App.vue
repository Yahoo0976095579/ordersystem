<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import FloatingCartBar from "@/components/FloatingCartBar.vue";
import { Icon } from "@iconify/vue";
import { useSessionStore } from "./stores/session";
const sessionStore = useSessionStore();
sessionStore.initializeSession();
const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
const route = useRoute();

const showFloatingBar = computed(() => {
  return (
    totalItems.value > 0 &&
    route.name !== "cart" && // 不在购物车页
    route.name !== "product-detail" && // 不在商品详情页
    route.name !== "order-history" // <-- 【新增这一行】不在订单记录页
  );
});
</script>

<template>
  <div id="app-wrapper">
    <header>
      <nav>
        <RouterLink to="/" class="brand">線上點餐系統</RouterLink>
        <div class="nav-links">
          <RouterLink to="/history" class="nav-link-item icon-button">
            <Icon icon="solar:document-text-linear" class="icon" />
            <span class="text">訂單紀錄</span>
          </RouterLink>

          <RouterLink to="/cart" class="nav-link-item icon-button cart-link">
            <Icon icon="solar:cart-large-minimalistic-linear" class="icon" />
            <span class="text">購物車</span>
            <span v-if="totalItems > 0" class="cart-count">{{
              totalItems
            }}</span>
          </RouterLink>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <FloatingCartBar v-if="showFloatingBar" />
    <div id="toast-container"></div>
  </div>
</template>

<style>
/* 全域樣式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #f8f9fa;
}

#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex-grow: 1;
  padding-top: 60px; /* 留出 header 的空間 */
}
/* App.vue 樣式 */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 200;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.cart-link {
  position: relative;
  font-size: 1.8rem;
  text-decoration: none;
  color: #333;
}
.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
}
/* 新增 Toast 樣式 */
#toast-container {
  position: fixed;
  /* top: 80px;  <-- 刪除或註解掉這一行 */
  bottom: 20px; /* <-- 新增這一行，定位到右下角 */
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast {
  padding: 12px 20px;
  background-color: #2ecc71; /* 成功顏色 */
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  opacity: 0;
  transform: translateX(100%);
  animation: slideIn 0.5s forwards, fadeOut 0.5s 2.5s forwards;
}
/* 讓導覽列的連結群組保持水平排列 */
.nav-links {
  display: flex;
  align-items: center; /* 讓子元素垂直置中 */
  gap: 15px; /* 在每個連結之間新增間距，這比 margin 更方便 */
}

/* 讓 icon 和文字在單一連結內水平排列 */
.nav-link-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

/* 確保電腦版顯示文字和左右排列 */
.nav-link-item .text {
  font-size: 1rem;
  margin-left: 5px;
}

/* 點擊和懸停效果 */
.nav-link-item:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

.nav-link-item:active {
  transform: translateY(0);
}

/* ... 保留所有其他 CSS 樣式 ... */

/* 手機版的樣式調整 */
@media (max-width: 768px) {
  /*
    * 移除或註解掉這行，讓手機板顯示文字
    * .nav-link-item .text {
    * display: none;
    * }
  */

  /* 其他手機版樣式可以保留 */
  .nav-link-item {
    padding: 0.5rem; /* 縮小手機上的內距 */
  }
}
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
@media (max-width: 768px) {
  main {
    padding-bottom: 80px; /* 留出 floating bar 的空間 */
  }
  .cart-link {
    display: none;
  }
  #toast-container {
    /* 在手機上，讓它顯示在懸浮購物車的上方 */
    bottom: 90px;
  }
}
</style>
