import { createApp } from "vue";
import App from "./App.vue";
import { name } from "../package.json";

import "./assets/main.css";

document.title = name;

createApp(App).mount("#app");
