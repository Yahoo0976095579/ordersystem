<script setup>
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { totalItems, totalPrice } = storeToRefs(cartStore);
</script>

<template>
  <RouterLink to="/cart" class="floating-cart-bar">
    <div class="cart-info">
      <div class="cart-icon-wrapper">
        🛒
        <span v-if="totalItems > 0" class="cart-count">{{ totalItems }}</span>
      </div>
      <span class="total-price">總金額: ${{ totalPrice }}</span>
    </div>
    <div class="checkout-action">
      <span>查看購物車</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.floating-cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem 1rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.cart-info {
  display: flex;
  align-items: center;
}
.cart-icon-wrapper {
  position: relative;
  font-size: 1.8rem;
  margin-right: 1rem;
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
  font-weight: bold;
}
.total-price {
  font-size: 1.1rem;
  font-weight: 500;
}
.checkout-action {
  background-color: #2ecc71;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}
</style>
