<template>
    <div id="wrapper">
        <webview :src="src_url">

        </webview>
    </div>
</template>

<script>


  export default {
    name: 'App',
    props: [
      'tab'
    ],
    components: {

    },
    data: () => {
      return {
        src_url: ""
      }
    },
    mounted () {
      this.src_url = 'https://google.com';
    }
  }
</script>
<style>
    webview{
        width: 100%;
        height: 100%;
    }
    #wrapper {
        height: 100%;
    }
</style>

