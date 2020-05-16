<template lang="pug">
  canvas.pdf-page
</template>

<script>

    export default {
        name: "PDFPage",
        props: [
            'pdf',
            'page',
            'scale',
        ],
        data() {
            return {

            }
        },
        async mounted() {
            const page = await this.pdf.getPage(this.page);
            const viewport = page.getViewport(this.scale ? this.scale : 1.5);

            const canvas = this.$el
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.display = 'block';
            const ctx = canvas.getContext('2d');
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            await page.render(renderContext);




        }
    }
</script>
<style scoped>
  .pdf-page {
    box-shadow: 2px 2px 5px -1px rgba(0,0,0,0.75);
    margin: 30px auto;
  }
</style>

