<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="order-status-view">
    <div class="status-icon success">✓</div>
    <h1>訂單已成立</h1>
    <p class="message">請記住您的訂單編號，並前往櫃檯完成付款。</p>
    <div class="actions">
      <RouterLink to="/history" class="btn-secondary">查看訂單紀錄</RouterLink>
      <RouterLink to="/" class="btn-primary">返回首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.order-status-view {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.status-icon {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  font-size: 3rem;
  color: white;
}

.status-icon.success {
  background-color: #2ecc71;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #ecf0f1;
  color: #34495e;
}
</style>
