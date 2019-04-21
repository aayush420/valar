import Vue from "vue";
import JaffaBanner from "./Banner.vue";
import JaffaBar from "./Bar.vue";

const Components = {
  JaffaBanner,
  JaffaBar
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
