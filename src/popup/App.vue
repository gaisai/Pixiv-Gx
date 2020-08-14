<template>
  <div id="popup">
    <h1>Pixiv-Gx</h1>
    <p>Pixivの作品をPDF形式で一括ダウンロード</p>
    <p>Ver 1.0.0</p>
    <div>
      <chrome-ex-img class="chrome-ex-img" :imagePath="'128.png'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChromeExImg from "@/components/ChromeExImg.vue";

@Component({
  components: {
    ChromeExImg,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#popup {
  width: 200px;
  height: auto;
  margin: 5px;
  display: block;
  text-align: center;
  h1 {
    font-size: 20px;
    color: #3cb6e3;
    font-weight: bold;
    text-align: center;
  }
  img {
    margin: 0 auto;
    border-radius: 20px;
  }
}
</style>
