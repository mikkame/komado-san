<template lang="pug">
  div
    #captureSelectot(v-if="!source")
      p 共有する画面を選択してください
      ul
        li(v-for="source in sources", @click="pickWindow(source)") {{source.name}}
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
            const sources = await window.desctipCapture.getSources({types:['window'], thumbnailSize: {width:200,height:200}})
            this.sources = sources
        }
    }
</script>
<style scoped>

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

