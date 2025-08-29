<script setup>
// ... script 內容完全不變 ...
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { API_BASE_URL } from "@/config.js";
import { useCartStore } from "@/stores/cart";
import { showToast } from "@/utils/toast.js";

const props = defineProps({
  id: { type: [String, Number], required: true },
});
const router = useRouter();
const cartStore = useCartStore();
const product = ref(null);
const quantity = ref(1);
const isLoading = ref(true);
const error = ref(null);
const isAdding = ref(false);
async function fetchProductDetails() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Products/${props.id}`
    );
    product.value = response.data;
  } catch (err) {
    console.error(`無法獲取 ID 為 ${props.id} 的產品:`, err);
    error.value = "找不到該產品或發生錯誤。";
  } finally {
    isLoading.value = false;
  }
}
onMounted(() => {
  fetchProductDetails();
});

function increaseQuantity() {
  quantity.value++;
}
function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--;
}

async function handleAddToCart() {
  if (!product.value || isAdding.value) return; // 如果正在加入中，就直接返回

  // 使用 try...finally 確保不論成功或失敗，狀態都會被重置
  try {
    isAdding.value = true; // <-- 【變更 2】在開始時，將狀態設為 true

    cartStore.addToCart(product.value, quantity.value);
    showToast(`已加入 ${product.value.name}`);
    router.back();
  } finally {
    isAdding.value = false; // <-- 【變更 3】在結束時，將狀態設回 false
  }
}
</script>

<template>
  <div class="page-container">
    <div class="header-bar">
      <button @click="router.back()" class="back-btn">← 返回菜單</button>
    </div>

    <div v-if="isLoading" class="status-message">正在載入產品資訊...</div>
    <div v-else-if="error" class="status-message error">{{ error }}</div>

    <!-- 主要內容區域 -->
    <div v-else-if="product" class="product-detail-view">
      <div class="product-image">
        <img :src="product.imageUrl" :alt="product.name" />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="description">{{ product.longDescription }}</p>
        <!-- 價格移到這裡，作為內容的一部分 -->
        <p class="price-in-content">${{ product.price }}</p>
      </div>
    </div>

    <!-- 新增：固定的底部操作欄 -->
    <!-- 只有在產品載入成功後才顯示 -->
    <div v-if="product" class="bottom-action-bar">
      <!-- 新增的左側容器 -->
      <div class="left-controls">
        <!-- 顯示計算後的價格 -->
        <span class="price-in-bar">${{ product.price * quantity }}</span>
        <!-- 數量控制器 -->
        <div class="quantity-control">
          <button @click="decreaseQuantity" class="quantity-btn">-</button>
          <span class="quantity-display">{{ quantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn">+</button>
        </div>
      </div>

      <button
        @click="handleAddToCart"
        class="add-to-cart-btn"
        :disabled="isAdding"
      >
        <!-- 當 isAdding 為 true 時，禁用按鈕 -->

        <!-- 根據 isAdding 的值，顯示不同的文字 -->
        {{ isAdding ? "加入中..." : "加入購物車" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  /* 關鍵：為底部的固定操作欄留出空間 */
  padding-bottom: 100px;
}

/* ... header-bar, back-btn, status-message 等樣式不變 ... */
.header-bar {
  margin-bottom: 1.5rem;
}
.back-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}

.product-detail-view {
  display: flex;
  gap: 2rem;
}
.product-image {
  /* 【變更 1】不再使用 flex: 1 */
  /* 設定一個固定的寬度百分比，例如 45% */
  width: 45%;
  flex-shrink: 0; /* 防止容器在空間不足時被壓縮 */

  /* 【變更 2】使用 aspect-ratio 來鎖定長寬比為 4:3 */
  aspect-ratio: 4 / 3;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.description {
  margin: 1rem 0;
  color: #555;
  line-height: 1.8;
  flex-grow: 1;
}

/* 內容區的價格樣式 */
.price-in-content {
  font-size: 2rem;
  font-weight: bold;
  color: #333; /* 顏色可以調整 */
  margin-top: 1.5rem;
}

/* --- 以下是新的底部操作欄樣式 --- */
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  /* 
    將 justify-content 改為 space-between，讓元素分散對齊
    並移除 gap
  */
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

/* 新增一個 div 來包裹價格和數量控制器 */
.left-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* 新增底部價格樣式 */
.price-in-bar {
  font-size: 1.5rem;
  font-weight: bold;
}

/* ... quantity-control, quantity-btn, quantity-display 樣式不變 ... */
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f7f7f7;
  border-radius: 25px;
  padding: 5px;
  border: 1px solid #ddd;
}
.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}
.quantity-display {
  min-width: 40px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.add-to-cart-btn {
  /* 移除 flex-grow: 1，讓按鈕恢復自然寬度 */
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem; /* 左右 padding 可以多一點 */
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.2s, opacity 0.2s; /* 增加 opacity 過渡 */
}
/* 新增：按鈕被禁用時的樣式 */
.add-to-cart-btn:disabled {
  background-color: #95a5a6; /* 顯示為灰色 */
  cursor: not-allowed; /* 滑鼠指標變為「禁止」 */
  opacity: 0.7;
}

@media (max-width: 768px) {
  .product-detail-view {
    flex-direction: column;
  }
  .product-image {
    /* 在手机上，让图片宽度撑满屏幕 */
    width: 100%;

    /* 关键一步：重置 aspect-ratio，让高度回归自然 */
    aspect-ratio: auto;
  }

  .product-image img {
    /* 
      因为容器不再有固定的高度，
      所以图片的高度也应该设为 auto，
      以保持其原始比例。
    */
    height: auto;
  }
}
</style>
