import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

chrome.runtime.onMessage.addListener(
  async function (message, sender, callback) {
    await new Promise(r => setTimeout(() => r(), 1000));
    console.log("main.ts < chrome.runtime.onMessage.addListener:"+message+" >");
    if (message == "hashchange") {
      appendApp();
    }
  }
);

window.onload = async () => {
  await new Promise(r => setTimeout(() => r(), 1000));
  console.log("main.ts < window.onload >");
  appendApp();
  }
};

window.onhashchange = async function() { 
  await new Promise(r => setTimeout(() => r(), 1000));
  console.log("main.ts < window.onhashchange >");
  appendApp();
  } 
}


function appendApp() {
  console.log("main.ts < appendApp:"+location.href+" >")
  const app = document.querySelector("#app");
  const url = location.href

  //画像ページの時
  if( url.indexOf("www.pixiv.net/artworks/") >= 0 ){    
    const img = document.querySelectorAll("div[role=presentation] img")
    console.log("This is artwork. => img num:"+img.length)
    //画像枚数が１枚以上の場合のみダウンロード機能を追加
    if(img.length > 0 ){
      if (!app) { 
        console.log("not exist app. => add app")
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
    }else{
      delete_app();
    }

  //その他のページの時
  }else{
    console.log("This is other?")
    delete_app();
  }
}


function delete_app(){
    console.log("main.ts < delete_app >");
    let app = document.querySelector("#app"); 
    console.log(app);

    if (app) { 
      console.log("exist app. => Delete app");
      app.remove();
      console.log(app);
    }
}