import Vue from "vue";
import JaffaBanner from "./Banner.vue";

const Components = {
  JaffaBanner
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
