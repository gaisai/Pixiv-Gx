
<template>

  <div id="app">
    <button id="bu_button" @click="download_images();">⬇ PDFダウンロード</button>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { jsPDF } from "jspdf";
import ChromeExImg from "@/components/ChromeExImg.vue";
import html2canvas from 'html2canvas';
 
@Component({
  components: {
    ChromeExImg,
  },
})
export default class App extends Vue {
  public mounted() {
    console.log("< mounted >")
    //this.check();
  }


  //画像のダウンロード
  public async download_images() {
    console.log("< download_images >")

    //ダウンロード対象をPDF作成
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(40);
    let x = 0, y = 0;

    //１枚目のimgファイルのURLの取得
    const url = this.getHTMLImageElements()[0].src.split("p0");
    console.log("target url:" + url);

    //imgファイルを一枚ずつPDFに追加
    for (let i = 0; 1; i++) {
      //i枚目のimgファイルのURLの取得
      let url_p = url[0] + "p" + String(i) + url[1];
      const img = await fetch(url_p);
      const blob = await img.blob();
      console.log("page:" + i + ", blob size:" + blob.size+ ", target:" + url_p);
      
      //全ページ読み込み後にbreak
      if (blob.size == 0) {
        console.log("page:over("+i+")");
        break;
      }

      //imgファイル読み込み成功時実行
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        
        //１枚目の時はPDFファイルにページ追加不要
        if( i > 0 ){
          doc.addPage();
        }

        var base64data = reader.result;
        const img = new Image();

        //imgサイズ調整
        img.onload = function () {
          const asp = img.height / img.width;
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
        
          if (pageWidth * asp > pageHeight) {
            doc.addImage( base64data as string, "jpg",
              (pageWidth - pageHeight / asp) / 2, y,
              pageHeight / asp, pageHeight
            );
          } else {
            doc.addImage( base64data as string, "jpg",
              x, (pageHeight - pageWidth * asp) / 2,
              pageWidth, pageWidth * asp
            );
          };
        };

        img.src = base64data as string;
      };
    }
    doc.save(this.getPdfTitle());
  }







  public getPdfTitle() {
    const date = Date.now();
    return (
      (document.querySelector("figcaption h1")?.textContent ?? date) + ".pdf"
    );
  }


  public getHTMLImageElements() {
    return [
      ...document.querySelectorAll("div[role=presentation] img"),
    ] as HTMLImageElement[];
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
  background-color: #e23126;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
}
</style>
