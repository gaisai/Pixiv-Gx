import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

chrome.runtime.onMessage.addListener(
  function (message, sender, callback) {
    if (message === "hashchange") {
      const app = document.querySelector("#app");
      if (!app) {
        appendApp();
      }
    }
  }
);

window.onload = async () => {
  appendApp();
};

function appendApp() {
  const el = document.querySelector("aside");
  if (el) {
    el.insertAdjacentHTML(
      'afterbegin',
      '<div id="app"></div>',
    );
    new Vue({
      render: (h) => h(App),
    }).$mount('#app');
  }
}