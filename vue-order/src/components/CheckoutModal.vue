<script setup>
import { ref } from "vue";

const props = defineProps({
  grandTotal: { type: Number, required: true },
  isSubmitting: { type: Boolean, required: true },
});

const emit = defineEmits(["close", "confirm"]);

const selectedPaymentMethod = ref("Cash");
const paymentOptions = ["Cash", "CreditCard", "LinePay"];
const paymentLabels = {
  Cash: "現金支付",
  CreditCard: "信用卡",
  LinePay: "Line Pay",
};

function confirmCheckout() {
  emit("confirm", selectedPaymentMethod.value);
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>確認結帳</h2>
      <p class="total-display">
        應付總額：<strong>${{ grandTotal.toFixed(2) }}</strong>
      </p>

      <div class="payment-options">
        <label
          v-for="option in paymentOptions"
          :key="option"
          :class="{ selected: selectedPaymentMethod === option }"
        >
          <input
            type="radio"
            :value="option"
            v-model="selectedPaymentMethod"
            name="payment"
          />
          {{ paymentLabels[option] }}
        </label>
      </div>

      <div class="modal-actions">
        <button
          @click="$emit('close')"
          class="btn-cancel"
          :disabled="isSubmitting"
        >
          取消
        </button>
        <button
          @click="confirmCheckout"
          class="btn-confirm"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "處理中..." : "確認付款" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.total-display {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.payment-options label {
  display: block;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
.payment-options label.selected {
  border-color: #3498db;
  background-color: #f0f8ff;
}
.payment-options input {
  display: none;
}
.modal-actions {
  display: flex;
  gap: 1rem;
}
.modal-actions button {
  flex-grow: 1;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
.btn-cancel {
  background: #ecf0f1;
}
.btn-confirm {
  background: #2ecc71;
  color: white;
}
</style>
