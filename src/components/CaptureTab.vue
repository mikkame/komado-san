<template lang="pug">
  div(style='height:100%')
    #captureSelectot(v-if="!source")
      p 共有する画面を選択してください
      .thumbnails
        .thumbnail(v-for="source in sources", @click="pickWindow(source)")
          img(:src='source.thumbnail')
          p {{source.name}}
    video(:srcObject.prop="source", autoplay, v-if="source").capture

</template>

<script>


    export default {
        name: 'App',
        props: [
            'tab',
        ],
        data(){
            return {
                sources:[],
                source:null
            }
        },
        methods:{
            async pickWindow(source){
                this.source = await navigator.mediaDevices.getUserMedia({
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: source.id,
                            minWidth: 1280,
                            maxWidth: 1280,
                            minHeight: 720,
                            maxHeight: 720
                        }
                    }
                })

            }
        },
        async mounted() {
            const sources = (await window.electronApi.requestDesktopCapture()).filter((src)=> {
                return src.name != '小窓さん'
            })
            this.sources = sources

        }
    }
</script>
<style scoped>
  #captureSelectot {
    height: 100%;
  }
  .thumbnails {
    display: flex;
    justify-content:center;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-wrap: wrap;
  }
  .thumbnail {
    margin: 10px;
    width: 200px;
    cursor: pointer;
  }
  .thumbnail img, .thumbnail p{
    cursor: pointer;
  }
  .thumbnail p{
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 200px;
    overflow: hidden;
    text-align: center;
  }
  iframe{
    width: 98%;
    height: 98%;
    margin: 1%;
  }
  .draging iframe {
    display: none;
  }
  .capture {
    width: 100%;
    height: 100%;
    pointer-events: none;

  }
</style>

