<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart";

// 接收父元件傳來的 item props
const props = defineProps({
  item: { type: Object, required: true },
});

// 存取購物車 store
const cartStore = useCartStore();

// 建立一個計算屬性，來動態計算此商品在購物車中的數量
const quantityInCart = computed(() => {
  // 在購物車的 items 陣列中尋找 id 相符的商品
  const itemInCart = cartStore.items.find(
    (cartItem) => cartItem.id === props.item.id
  );

  // 如果找到了，就回傳它的數量；如果沒找到，就回傳 0
  return itemInCart ? itemInCart.quantity : 0;
});
</script>

<template>
  <RouterLink :to="`/product/${props.item.id}`" class="menu-item-card">
    <!-- 新增：數量角標 -->
    <!-- 只有當數量大於 0 時，才顯示這個 div -->
    <div v-if="quantityInCart > 0" class="quantity-badge">
      {{ quantityInCart }}
    </div>

    <div class="item-content">
      <h3 class="item-name">{{ props.item.name }}</h3>
      <p class="item-description">{{ props.item.shortDescription }}</p>
      <p class="item-price">${{ props.item.price }}</p>
    </div>
    <div class="item-image-wrapper">
      <img
        :src="props.item.imageUrl"
        :alt="props.item.name"
        class="item-image"
        loading="lazy"
      />
    </div>
  </RouterLink>
</template>

<style scoped>
.menu-item-card {
  /* 新增 position: relative，讓角標可以相對於卡片定位 */
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.menu-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

/* 新增：數量角標的樣式 */
.quantity-badge {
  position: absolute;
  top: -10px; /* 向上偏移，突出卡片 */
  right: -10px; /* 向右偏移 */
  z-index: 10;

  width: 24px;
  height: 24px;
  border-radius: 50%; /* 圓形 */
  background-color: #e67e22; /* 橘色，更醒目 */
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8rem;
  font-weight: bold;
  border: 2px solid white; /* 增加一個白色邊框，更有質感 */
}

/* ... 其他樣式保持不變 ... */
.item-content {
  flex-grow: 1;
  padding-right: 1rem;
}
.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.item-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
}
.item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
} /* 價格顏色改為藍色 */
.item-image-wrapper {
  flex-shrink: 0;
}
.item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
