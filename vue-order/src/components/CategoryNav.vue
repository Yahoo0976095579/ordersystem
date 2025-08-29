<script setup>
defineProps({
  categories: { type: Array, required: true },
});

function scrollToCategory(categoryName) {
  const element = document.getElementById(`category-${categoryName}`);
  if (element) {
    // 加上一個 offset，避免被頂部的 sticky header 擋住
    const headerOffset = 70; // header 的高度 + 一些間距
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <div class="category-nav">
    <button
      v-for="category in categories"
      :key="category"
      @click="scrollToCategory(category)"
      class="category-item"
    >
      {{ category }}
    </button>
  </div>
</template>

<style scoped>
.category-nav {
  position: sticky;
  top: 60px; /* 假設 Header 高度為 60px */
  z-index: 100;
  display: flex;
  overflow-x: auto;
  background-color: #fff;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.category-nav::-webkit-scrollbar {
  display: none;
}
.category-item {
  white-space: nowrap;
  padding: 0.5rem 1.25rem;
  margin-right: 0.75rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
