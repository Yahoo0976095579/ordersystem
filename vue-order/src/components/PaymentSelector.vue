<script setup>
import { defineModel } from 'vue';

// 使用 defineModel 來建立一個可以被 v-model 綁定的 ref
// 當父組件使用 v-model="paymentMethod" 時，這個 model 就會自動與父組件的 paymentMethod 同步
const model = defineModel();

</script>

<template>
  <div class="payment-section">
    <h3 class="section-title">選擇付款方式</h3>
    <div class="payment-options">
      <!-- 將 v-model 直接綁定到 model 上 -->
      <label :class="{ selected: model === 'cash' }">
        <input type="radio" v-model="model" value="cash" />
        <span class="option-name">現金支付</span>
      </label>
      <label :class="{ selected: model === 'credit_card' }">
        <input type="radio" v-model="model" value="credit_card" />
        <span class="option-name">信用卡</span>
      </label>
      <label :class="{ selected: model === 'line_pay' }">
        <input type="radio" v-model="model" value="line_pay" />
        <span class="option-name">LINE Pay</span>
      </label>
    </div>

    <!-- 根據 model 的值動態顯示對應的區塊 -->
    <div class="payment-details">
      <div v-if="model === 'credit_card'" class="credit-card-form">
        <input type="text" placeholder="信用卡號 **** **** **** ****" disabled />
        <div class="card-details-row">
          <input type="text" placeholder="有效期限 MM/YY" disabled />
          <input type="text" placeholder="安全碼 CVC" disabled />
        </div>
      </div>
      <div v-if="model === 'line_pay'" class="line-pay-view">
        <p>請使用 LINE App 掃描 QR Code 完成付款</p>
        <div class="fake-qr-code"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- 將 ShoppingCart.vue 中所有與付款相關的樣式，原封不動地搬移到這裡 --- */
.payment-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.payment-options label {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-options label.selected {
  border-color: #3498db;
  background-color: #f0f8ff;
  font-weight: bold;
}

.payment-options input[type="radio"] {
  margin-right: 0.5rem;
}

.payment-details {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 100px; /* 給一個最小高度，防止切換時跳動 */
}

.credit-card-form input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.credit-card-form input:first-child {
  margin-bottom: 0.5rem;
}

.card-details-row {
  display: flex;
  gap: 0.5rem;
}

.line-pay-view {
  text-align: center;
}

.line-pay-view p {
  margin-bottom: 1rem;
}

.fake-qr-code {
  width: 120px;
  height: 120px;
  background-color: #e0e0e0;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
