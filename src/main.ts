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
  await new Promise(r => setTimeout(() => r(), 1000));
  const app = document.querySelector("#app");
  if (!app) {
    appendApp();
  }
};

window.onhashchange = async function() { 
  await new Promise(r => setTimeout(() => r(), 1000));
  const app = document.querySelector("#app");
  if (!app) {
    appendApp();
  } 
}


function appendApp() {
  console.log("<appendApp:"+location.href+">")
  
  const url = location.href

  //画像ページの時
  if( url.indexOf("www.pixiv.net/artworks/") >= 0 ){
    console.log("This is artwork")
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

  //その他のページの時
  }else{
    console.log("This is other?")
  }

}