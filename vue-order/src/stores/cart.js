import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);

    const totalPrice = computed(() =>
      items.value.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const totalItems = computed(() =>
      items.value.reduce((total, item) => total + item.quantity, 0)
    );

    function addToCart(product, quantity = 1) {
      if (quantity <= 0) return;
      const existingItem = items.value.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.value.push({ ...product, quantity: quantity });
      }
    }

    function removeFromCart(productId) {
      items.value = items.value.filter((item) => item.id !== productId);
    }

    function updateQuantity(productId, quantity) {
      const item = items.value.find((item) => item.id === productId);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          removeFromCart(productId);
        }
      }
    }

    function clearCart() {
      items.value = [];
    }

    return {
      items,
      totalPrice,
      totalItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  },
  {
    persist: true, // 加上這一行即可！
  }
);
