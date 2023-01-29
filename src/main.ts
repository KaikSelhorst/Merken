import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./userConfig";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/main.css";

const app = createApp(App);

library.add(fas);

app.component("FontAwesome", FontAwesomeIcon);

app.use(router);

app.mount("#app");
