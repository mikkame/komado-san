<template lang="pug">

  component(:is="viewerType", :blob="blob")
</template>

<script>
    import PDFViewer from "./PDFViewer";
    import UnknownViewer from"./UnknownViewer"
    export default {
        name: "FileTab",
        components: {
            PDFViewer,
            UnknownViewer,

        },
        props: [
            'tab',
        ],
        computed: {
            viewerType() {
                const mime = this.tab.blob.split('base64,',2)[0];
                if (mime.match('pdf')) {
                    return 'PDFViewer'
                }
                return 'UnknownViewer'
            },
            blob() {
                return this.tab.blob.split('base64,',2)[1]
            }
        },
        mounted() {

        }
    }
</script>
<style>
  #selector{
    width: 80%;
    margin:10% auto 0 auto;
  }
  iframe{
    width: 98%;
    height: 98%;
    margin: 1%;
  }
  .draging iframe {
    display: none;
  }
</style>

