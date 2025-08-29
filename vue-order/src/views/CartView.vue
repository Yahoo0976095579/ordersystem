<script setup>
import ShoppingCart from "@/components/ShoppingCart.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="cart-view">
    <h1>您的購物車</h1>
    <div class="cart-container">
      <ShoppingCart />
    </div>
    <div class="actions">
      <RouterLink to="/" class="continue-shopping-btn">繼續點餐</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.cart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.actions {
  text-align: center;
  margin-top: 2rem;
}
.continue-shopping-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #f0ad4e;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
</style>
