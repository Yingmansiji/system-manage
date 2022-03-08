import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/base.css";
import "element-plus/dist/index.css";
import { getCookie } from "./assets/js/utils";

const app = createApp(App);
store.commit("ETH-TOKEN", getCookie("ETH-TOKEN"));

app.use(store);
app.use(router);
app.mount("#app");
