<template lang="pug">
  #welcome
    .slider
      .tips Tips
      carousel(
        per-page="1",
        autoplay="true",
        autoplayHoverPause="false",
        autoplayTimeout="6000",
        speed="1000",
        loop="true"
        paginationActiveColor="#efefef",
        paginationColor="#000000"
      )
        slide
          .slide-contents
            p PDFファイルをドラッグ＆ドロップで表示できます
        slide
          .slide-contents
            p Ctrl+Dでお絵かきモードに入れます
        slide
          .slide-contents
            p 画面下部にカーソルを合わせるとカメラの切り替えができます
        slide
          .slide-contents
            p ワイプをダブルクリックで全画面表示できます
    .options
      h1 小窓さんはオンライン会議支援ツールです
      ul
        li 表示するつもりがなかった資料
        li メール通知
        li チャット通知

      p 間違って配信してしまったことはありませんか？
      p
        | このアプリを画面共有することによって
        br
        | ワイプつき画面を簡単に共有できます。
        br
        | 通知を巻き込むことはありません。
        br
        | 共有したい資料のみ表示します。

      p 小窓さんはOSSで開発されています。


      #start.btn.btn-default.btn-large(@click="start") 利用をスタート

</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: 'Welcome',
        components: {
            Carousel,
            Slide
        },
        methods: {
            start(){
                window.electronApi.startMainApp()
            }
        }

    }
</script>

<style scoped>
  .tips {
    position: absolute;
    font-size: 2em;
    left: 10px;
    color: white;
  }
  .slider {
    background: rgba(0, 0, 0, 0.8);
  }
  .slider .slide-contents {
    color: white;
    text-align: center;
    padding:30% 10%;

    display: block;
  }
  .slider,.options{

    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }
  .options {
    padding: 50px;
  }
  .options h1 {
    font-size: 1.3em;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  #welcome {
    height: 100%;
    width: 100%;
  }
  #start {
    position: absolute;
    right: 30px;
    bottom: 10px;
    width: 140px;
  }
</style>
