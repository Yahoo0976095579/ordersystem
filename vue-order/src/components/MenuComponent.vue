<script setup>
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";

// --- 模擬從後端 API 取得的資料 ---
// 未來您可以將這裡換成用 axios 向您的 ASP.NET Core Web API 請求資料
const mockMenuItems = ref([
  {
    id: "1",
    name: "經典牛肉漢堡",
    price: 180,
    shortDescription: "多汁牛肉與新鮮蔬菜",
    longDescription: "嚴選100%純牛肉，經過高溫鐵板煎製，鎖住所有肉汁...",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675129626435-339c9a0a0397?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "香脆雞腿堡",
    price: 160,
    shortDescription: "外皮酥脆，雞肉嫩滑",
    longDescription: "選用去骨雞腿排，以特製香料醃製入味後...",
    imageUrl: "./berger1.jpg",
  },
  {
    id: "3",
    name: "瑪格麗特披薩",
    price: 250,
    shortDescription: "番茄、羅勒與起司",
    longDescription: "義大利的經典風味。使用自製的番茄紅醬...",
    imageUrl:
      "https://images.unsplash.com/photo-1598021680133-d7a2c73d473?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "美式炸薯條",
    price: 80,
    shortDescription: "外酥內軟的經典配菜",
    longDescription: "選用高品質馬鈴薯，切成恰到好處的條狀...",
    imageUrl:
      "https://images.unsplash.com/photo-1576107232684-c7be35d03b9b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "冰檸檬紅茶",
    price: 60,
    shortDescription: "清涼解渴，酸甜適中",
    longDescription: "以精選紅茶葉沖泡，茶香濃郁，搭配新鮮現榨的檸檬汁...",
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c19761a?q=80&w=1964&auto=format&fit=crop",
  },
]);
// ------------------------------------

const menuItems = ref(mockMenuItems);

// 在此處可以加入 onMounted 生命週期勾子，用來 call API
// import { onMounted } from 'vue'
// import axios from 'axios'
// onMounted(async () => {
//   try {
//     const response = await axios.get('YOUR_API_ENDPOINT/products');
//     menuItems.value = response.data;
//   } catch (error) {
//     console.error("無法獲取菜單:", error);
//   }
// });
</script>

<template>
  <div class="menu-list">
    <!-- class 名稱從 menu-grid 改為 menu-list -->
    <MenuItem v-for="item in menuItems" :key="item.id" :item="item" />
  </div>
</template>

<style scoped>
.menu-list {
  display: flex;
  flex-direction: column; /* 改為垂直欄式佈局 */
  gap: 1rem; /* 設定卡片之間的間距 */
}
</style>
