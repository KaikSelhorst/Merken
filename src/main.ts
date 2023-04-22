import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./user/config";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

library.add(fas);

app.component("FontAwesome", FontAwesomeIcon);

app.use(pinia);
app.use(router);

app.mount("#app");
