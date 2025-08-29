import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { API_BASE_URL } from "@/config.js";

export const useMenuStore = defineStore("menu", () => {
  // State
  const groupedMenuData = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  // Computed (Getter)
  const categories = computed(() => {
    if (Array.isArray(groupedMenuData.value)) {
      return groupedMenuData.value.map((group) => group.categoryName);
    }
    return [];
  });

  // Action
  async function fetchMenuData() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Menu/GetGroupedMenu`);
      groupedMenuData.value = response.data;
    } catch (err) {
      console.error("無法獲取菜單資料:", err);
      error.value = "抱歉，無法載入菜單，請稍後再試。";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    groupedMenuData,
    isLoading,
    error,
    categories,
    fetchMenuData,
  };
});
