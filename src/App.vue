<template>
  <div id="app">
    <button @click="download">⬇ PDFダウンロード</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { jsPDF } from "jspdf";
import ChromeExImg from "@/components/ChromeExImg.vue";

@Component({
  components: {
    ChromeExImg,
  },
})
export default class App extends Vue {
  public mounted() {
    // this.clickAllView();
  }

  public getPdfTitle() {
    const date = Date.now();
    return (
      (document.querySelector("figcaption h1")?.textContent ?? date) + ".pdf"
    );
  }

  public async download() {
    console.log("ダウンロード開始");
    const srces = this.getHTMLImageElements();

    // let pdfname = Date.now() + ".pdf";
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(40);
    let x = 0;
    let y = 0;
    const title = "title";

    let url = srces[0].src.split("p0");
    console.log("url:" + url);

    console.log("pages:" + srces.length);
    for (let i = 0, len = srces.length; 1; i++) {
      console.log("now:" + i);
      let url_p = url[0] + "p" + String(i) + url[1];
      const img = await fetch(url_p);
      //window.open(url_p)
      const blob = await img.blob();
      console.log("page:" + i + ", blob size:" + blob.size);
      if (blob.size == 0) {
        console.log("!!!!!!!!!!!!");
        break;
      }

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        const img = new Image();
        img.onload = function () {
          console.log(img.width, img.height);
          const asp = img.height / img.width;
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          // ページの高さをオーバーしてしまう場合
          if (pageWidth * asp > pageHeight) {
            doc.addImage(
              base64data as string,
              "jpg",
              x,
              y,
              pageHeight / asp,
              pageHeight
            );
          } else {
            doc.addImage(
              base64data as string,
              "jpg",
              x,
              y,
              pageWidth,
              pageWidth * asp
            );
          }
          doc.addPage();
        };
        img.src = base64data as string;
      };
    }
    doc.save(this.getPdfTitle());
  }

  public getHTMLImageElements() {
    return [
      ...document.querySelectorAll("div[role=presentation] img"),
    ] as HTMLImageElement[];
  }

  public getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

button {
  text-align: center;
  font-size: 20px;
  width: 100%;
  height: 30px;
  color: black;
  border: 1px solid gray;
  border-radius: 3px;
  &:hover {
    background-color: #e23126;
    color: white;
  }
}
</style>
