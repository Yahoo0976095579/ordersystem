<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores/menu";
import CategoryNav from "@/components/CategoryNav.vue";
import MenuItem from "@/components/MenuItem.vue";

// 初始化 menu store
const menuStore = useMenuStore();

// 從 store 中獲取狀態和 computed properties
// storeToRefs 確保我們獲取的是響應式物件
const { groupedMenuData, isLoading, error, categories } = storeToRefs(menuStore);

// 在組件掛載時，觸發 action 來獲取數據
onMounted(() => {
  // 只有在數據尚未載入時才去獲取，避免重複請求
  if (groupedMenuData.value.length === 0) {
    menuStore.fetchMenuData();
  }
});
</script>

<template>
  <div class="home-view">
    <div v-if="isLoading" class="status-message">正在載入菜單...</div>
    <div v-else-if="error" class="status-message error">{{ error }}</div>

    <template v-else>
      <CategoryNav :categories="categories" />

      <div class="menu-sections">
        <section
          v-for="group in groupedMenuData"
          :key="group.categoryName"
          :id="`category-${group.categoryName}`"
          class="menu-section"
        >
          <h2 class="category-title">{{ group.categoryName }}</h2>

          <div class="menu-list">
            <MenuItem
              v-for="item in group.products"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.status-message {
  text-align: center;
  padding: 4rem 1rem;
  font-size: 1.2rem;
  color: #666;
}
.error {
  color: #e74c3c;
}

.menu-sections {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.menu-section:not(:last-child) {
  margin-bottom: 2rem;
}

.category-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0ad4e;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
