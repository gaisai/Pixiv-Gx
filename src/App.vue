<template>
  <div id="app"></div>
  

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
    this.check();
  }

  public dev_add_timestump(){
    let ver_in_bu = document.getElementById("bu_button");
    let date = new Date();
    ver_in_bu.innerHTML += +" "+ date.getMonth() +"-"+ date.getDate() +"-"+ date.getHours() +"-"+ date.getMinutes() +"-"+ date.getSeconds();
    console.log("timestump:"+ver_in_bu.innerHTML)
  }


  public getPdfTitle() {
    const date = Date.now();
    return (
      (document.querySelector("figcaption h1")?.textContent ?? date) + ".pdf"
    );
  }

  public async check() {
    console.log("チェック開始");
    
    //URIから対象をチェック
    const uri = this.getHTMLpElements()[0].baseURI;
    console.log("base URI:"+uri);

    //対象が画像
    if( uri.indexOf("artworks") >= 0 ){
      console.log("This is artworks! call getImageEl")
      
      //ボタン設置
      let dl_button = document.getElementById("app")
      dl_button.innerHTML = '<button id="bu_button" @click="download_images">⬇ PDFダウンロード</button>'
      console.log(dl_button.innerHTML)
      
      //開発時タイムスタンプ付与
      this.dev_add_timestump();
      
    //対象が小説
    }else if( uri.indexOf("novel") >= 0 ){
      console.log("This is novels! call getnovelEl");
    //対象が不明
    }else{
      console.log("What is this?")
    }

  }

  public async download_images() {

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

        img.onload = function () {
          const asp = img.height / img.width;
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
        
          //imgサイズ調整
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




  public getHTMLImageElements() {
    return [
      ...document.querySelectorAll("div[role=presentation] img"),
    ] as HTMLImageElement[];
  }

  public getHTMLpElements() {
    return [
      ...document.querySelectorAll('p'),
    ];
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
  background-color: #e23126;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
}
</style>
