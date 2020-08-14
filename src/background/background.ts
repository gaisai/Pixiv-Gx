import Vue from 'vue';
import App from '../App.vue';
Vue.config.productionTip = false;

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (/pixiv.net\/artwork/.test(changeInfo.url!)) {
        console.log(changeInfo.url);
        chrome.tabs.sendMessage(tabId, "hashchange");
    }
});





