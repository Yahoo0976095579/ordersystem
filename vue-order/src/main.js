import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// 確保 app.use(pinia) 只在這裡被呼叫一次
app.use(pinia);
app.use(router);

app.mount("#app");
