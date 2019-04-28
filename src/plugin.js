import Clock from './Clock.vue';

// module.exports = {
//   install: function (Vue, options) {
//     Vue.component('vue-clock', Clock);
//   }
// };


// Clock.install = function (Vue) {
//   Vue.component(Clock.name, Clock)
// }


// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(Clock)
// }

// export default Clock



export default {
  install(Vue) {
    Vue.component(Clock.name, Clock);
  }
};


