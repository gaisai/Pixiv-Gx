import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

chrome.runtime.onMessage.addListener(
  async function (message, sender, callback) {
    console.log(message);
    if (message == "hashchange") {
      await new Promise(r => setTimeout(() => r(), 1000));
      const app = document.querySelector("#app");
      if (!app) {
        appendApp();
      }
    }
  }
);

window.onload = async () => {
  appendApp();
  // chrome.runtime.onMessage.addListener(
  //   async function (message, sender, callback) {
  //     console.log(message);
  //     if (message == "hashchange") {
  //       await new Promise(r => setTimeout(() => r(), 1000));
  //       const app = document.querySelector("#app");
  //       if (!app) {
  //         appendApp();
  //       }
  //     }
  //   }
  // );
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