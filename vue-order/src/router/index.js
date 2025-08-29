import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import CartView from "../views/CartView.vue";
import OrderSuccessView from "../views/OrderSuccessView.vue";
import OrderHistoryView from "../views/OrderHistoryView.vue";
import OrderCashPaymentView from "../views/OrderCashPaymentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 每次跳轉頁面時，自動滾動到頁面頂部
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/cart", name: "cart", component: CartView },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
      props: true,
    },
    {
      path: "/order-success",
      name: "order-success",
      component: OrderSuccessView,
    },
    { path: "/history", name: "order-history", component: OrderHistoryView },
    {
      path: "/order-cash-payment",
      name: "order-cash-payment",
      component: OrderCashPaymentView,
    },
  ],
});

export default router;
