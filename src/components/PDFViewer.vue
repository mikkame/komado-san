<template lang="pug">
  div#pdf-viewer
    PDFPage(v-for="n of page_count", :pdf="pdf", :page="n")
</template>

<script>
    import PDFJS from 'pdfjs-dist';
    const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');

    PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    import PDFPage from "./PDFPage";
    export default {
        name: "PDFViewer",
        components: {
            PDFPage
        },
        props: [
            'blob',
        ],
        data() {
          return {
              page_count: undefined,
              pdf: undefined,


          }
        },
        async mounted() {
            this.pdf = await PDFJS.getDocument({data:atob(this.blob)})
            this.page_count = this.pdf.numPages
        }
    }
</script>
<style>
  #pdf-viewer {
    overflow-y: scroll;
    height: 100%;
  }
</style>

