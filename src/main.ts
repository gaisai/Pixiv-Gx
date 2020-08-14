import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
window.onload = async () => {
  const searchBar = document.querySelector("aside");
  if (searchBar) {
    searchBar.insertAdjacentHTML(
      'afterbegin',
      '<div id="app"></div>',
    );
    new Vue({
      render: (h) => h(App),
    }).$mount('#app');
  }
};
