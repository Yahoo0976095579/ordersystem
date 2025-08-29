<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/order";
import { showToast } from "@/utils/toast.js";
import PaymentSelector from "./PaymentSelector.vue"; // 引入新的組件

// 初始化 Stores 和 Router
const cartStore = useCartStore();
const orderStore = useOrderStore();
const router = useRouter();

// 從 cartStore 中獲取響應式狀態
const { items, totalPrice } = storeToRefs(cartStore);

// 本地元件狀態
const isSubmitting = ref(false);
const paymentMethod = ref("cash"); // 保留這個 ref，因為它需要透過 v-model 傳遞給子組件

// 增加與減少數量的函式實現
function increase(item) {
  cartStore.updateQuantity(item.id, item.quantity + 1);
}

function decrease(item) {
  cartStore.updateQuantity(item.id, item.quantity - 1);
}

// submitOrder 函式保持不變，因為它依賴於 paymentMethod
async function submitOrder() {
  if (items.value.length === 0) {
    alert("您的購物車是空的！");
    return;
  }
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  const orderData = {
    orderItems: JSON.parse(JSON.stringify(items.value)),
    totalAmount: totalPrice.value,
    paymentMethod: paymentMethod.value,
  };

  orderStore.addOrder(orderData);

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (paymentMethod.value === "cash") {
    showToast("訂單已送出，請至櫃檯付款");
    cartStore.clearCart();
    router.push("/order-cash-payment");
  } else {
    showToast("付款成功，訂單已成立！");
    cartStore.clearCart();
    router.push("/order-success");
  }

  isSubmitting.value = false;
}
</script>

<template>
  <div class="shopping-cart">
    <div v-if="items.length === 0" class="empty-cart">您的購物車是空的。</div>
    <div v-else>
      <ul class="cart-items">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price"
              >${{ item.price }} x {{ item.quantity }} = ${{
                (item.price * item.quantity).toFixed(2)
              }}</span
            >
          </div>
          <div class="item-actions">
            <div class="quantity-control">
              <button @click="decrease(item)" class="quantity-btn">-</button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button @click="increase(item)" class="quantity-btn">+</button>
            </div>
            <button
              @click="cartStore.removeFromCart(item.id)"
              class="remove-btn"
            >
              移除
            </button>
          </div>
        </li>
      </ul>

      <!-- 使用新的 PaymentSelector 組件，並透過 v-model 綁定 paymentMethod -->
      <PaymentSelector v-model="paymentMethod" />

      <div class="cart-summary">
        <p>
          總金額: <span class="total-price">${{ totalPrice.toFixed(2) }}</span>
        </p>
        <button
          @click="submitOrder"
          class="submit-order-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "正在處理..." : "確認付款" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- 所有與付款相關的樣式都已被移除，剩下的都是 ShoppingCart 自己的樣式 --- */
.shopping-cart {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
  color: #888;
  font-size: 1.1rem;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #eee;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.cart-item:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.item-price {
  color: #666;
  font-size: 0.9rem;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 2px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s;
}
.quantity-btn:hover {
  background-color: #e0e0e0;
}

.quantity-display {
  min-width: 35px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 0.25rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
}
.remove-btn:hover {
  color: #c0392b;
}

.cart-summary {
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  text-align: right;
  border-top: 2px solid #ddd;
}

.total-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.submit-order-btn {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}
.submit-order-btn:hover {
  background-color: #27ae60;
}
</style>
